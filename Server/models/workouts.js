/** @typedef {import('../../Client/src/model/workouts').Workout} Workout */
/** @typedef {import('../../Client/src/model/workouts').NewWorkout} NewWorkout*/

const getUser = require("./users").get;
const {connect} = require("./mongo");
const {ObjectId} = require("mongodb");
MyError = require("./MyError");

/**
 * @return {Promise<Collection<Workout>>}
 */
async function getData() {
    "use strict";
    try {
        const db = await connect();
        return db.collection('Workouts');
    } catch (err) {throw new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 13});}
}

/**
 * @description Seed the workouts collection
 * @return {Promise<void>}
 */
async function seed() {
    "use strict";
    try {
        const col = await getData();
        const count = await col.countDocuments();
        if (count > 0) return;
        await col.insertMany(require('../data/workouts.json').items);
    } catch (err) {throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 25});}
}
/**
 * @description Get all workouts
 * @returns {Promise<Workout[]>}
 */
async function getAll() {
    "use strict";
    try {
        const col = await getData();
        return await col.find({}).toArray();
    } catch (err) {throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 38});}
}

/**
 *  @param {import('mongodb').ObjectId} _id
 * @returns {Promise<Workout>}
 * */
async function get(_id) {
    "use strict";
    try{
        const col = await getData();
        return await col.findOne({_id: _id});
    } catch(err){throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 47});}
}
/**
 * @description Get all workouts by a specific user
 * @param {import('mongodb').ObjectId} userid
 * @returns {Promise<Workout[]>}
 */
async function getWorkoutsByUser(userid) {
    "use strict";
    /**@type {User} */
    let user;
    try{user = await getUser(userid);}
    catch(err){throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 61});}
    if (!user) throw new MyError(404, 'User not found', {fileName: 'models/workouts.js', lineNum: 63});
    try{
        const col = await getData();
        return await col.find({"uid": userid}).toArray();
    } catch(err){throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 64});}
}
/**
 * @description Search for workouts given a query
 * @param {string} q
 * @returns {Promise<Workout[]>}
 */
async function search(q) {
    "use strict";
    try{
        const col = await getData();
        return await col.find({
            $or: [
                {title: {$regex: q, $options: 'i'}},
                {location: {$regex: q, $options: 'i'}},
                {type: {$regex: q, $options: 'i'}},
            ],
        }).toArray();
    } catch(err){throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 76});}
}

/**
 * @description update a workout
 * @param {import('mongodb').ObjectId} _id
 * @param {Object} body
 * @returns Promise<Workout>
 */
async function update(_id, body) {
    "use strict";
    let col;
    try{col = await getData();}
    catch(err){throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 97});}
    /**@type {Workout} */
    let workout;
    try{workout = await col.findOne({_id: _id});}
    catch(err){throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 101});}
    if (!workout) throw new MyError(404, "Workout not Found", {fileName: 'models/workouts.js', lineNum: 87});
    try {await col.updateOne({_id: _id}, {$set: body});}
    catch(err){throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 104});}
    workout = await col.findOne({_id: _id});
    return workout;
}
/**
 * @param {import('mongodb').ObjectId} _id
 * @returns Promise<Workout>
 */
async function destroy(_id) {
    "use strict";
    let col;
    try{col = await getData();}
    catch(err){throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 115});}
    /** @type {Workout} */
    let workout;
    try{workout = await col.findOne({_id: _id});}
    catch(err){throw err instanceof MyError ? err : new MyError(500, "Failed to delete Workout", {fileName: 'models/workouts.js', lineNum: 115});}
    try{await getData().then(col => col.deleteOne({_id: _id}));
    } catch(err){throw err instanceof MyError ? err : new MyError(500, "Failed to delete Workout", {fileName: 'models/workouts.js', lineNum: 115});}
    return workout;
}

/**
 * @param {NewWorkout} inputInfo
 * @returns Promise<Workout>
 */
async function create(inputInfo) {
    "use strict";
    const user = await getUser(new ObjectId(inputInfo.uid));
    if (!user) throw new MyError(404, 'User not found', {fileName: 'models/workouts.js', lineNum: 114});
    try{
        const workouts = await getData();
        const result = await workouts.insertOne(inputInfo);
        return await workouts.findOne({_id: result.insertedId});
    } catch (err) {throw err instanceof MyError ? err : new MyError(500, "Failed to create new Workout", {fileName: 'models/workouts.js', lineNum: 115});}
}

module.exports = {
    getAll,
    get,
    getWorkoutsByUser,
    search,
    update,
    destroy,
    create,
    seed
};