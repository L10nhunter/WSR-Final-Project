/** @typedef {import('../../Client/src/model/workouts').Workout} Workout*/
/** @typedef {import('../../Client/src/model/workouts').NewWorkout} NewWorkout*/

const getUser = require("./users").get;
const {connect} = require("./mongo");
const {MyError} = require("./MyError");

/**
 * @return {Promise<Collection<Workout>>}
 */
async function getData() {
    "use strict";
    return await connect()
        .then(db => db.collection('Workouts'))
        .catch(err => {throw new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 15});});
}

/**
 * @description Seed the workouts collection
 * @return {Promise<void>}
 */
async function seed() {
    "use strict";
    const col = await getData();
    await col.insertMany(require('../data/workouts.json').items);
}

/**
 * @description Get all workouts
 * @returns {Promise<Workout[]>}
 */
async function getAll() {
    "use strict";
    return await getData().then(col => col.find({}).toArray());
}

/** @param {import('mongodb').ObjectId} _id */
async function get(_id) {
    "use strict";
    return await getData().then(col => col.findOne({_id: _id}));
}

/**
 * @description Get all workouts by a specific user
 * @param {import('mongodb').ObjectId} userid
 * @returns {Promise<Workout[]>}
 */
async function getWorkoutsByUser(userid){
    "use strict";
    const user= await getUser(userid).catch(err => {throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 50});});
    if(!user) throw new MyError(404, 'User not found', {fileName: 'models/workouts.js', lineNum: 51});
    return await getData()
        .then(workouts => {
            return workouts.find({"user._id": userid}).toArray();
        })
        .catch(err => {throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 56});});
}
/**
 * @description Search for workouts given a query
 * @param {string} q
 * @returns {Promise<Workout[]>}
 */
async function search(q) {
    "use strict";
    return await getData()
        .then(col => col.find({
            $or: [
                {title: {$regex: q, $options: 'i'}},
                {location: {$regex: q, $options: 'i'}},
                {type: {$regex: q, $options: 'i'}},
            ],
        }).toArray())
        .catch(err => {
            throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 74});
        });
}

/**
 * @description update a workout
 * @param {import('mongodb').ObjectId} _id
 * @param {Object} body
 * @returns Promise<Workout>
 */
async function update(_id, body) {
    "use strict";
    const workouts = await getData()
        .catch(err => {throw err instanceof MyError ? err : new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 87});});
    const workout = await workouts.findOne({_id:_id})
        .catch(err => {throw err instanceof MyError ? err : new MyError(404, err.message, {fileName: 'models/workouts.js', lineNum: 89});});
    if (!workout)throw new MyError(404, "Workout not Found", {fileName: 'models/workouts.js', lineNum: 90});
    const result = await workouts.updateOne({_id: _id}, {$set: body}).catch(err => {throw new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 91});});
    if(!result.acknowledged) throw new MyError(500, 'Failed To Update: result not acknowledged', {fileName: 'models/workouts.js', lineNum: 92});
    return await workouts.findOne({_id:_id});
}
/**
 * @param {import('mongodb').ObjectId} _id
 * @returns Promise<Workout>
 */
async function destroy(_id) {
    "use strict";
    const col = await getData();
    /** @type {Workout} */
    const workout = await col.findOne({_id: _id}).catch(err => {throw err instanceof MyError ? err : new MyError(404, err.message, {fileName: 'models/workouts.js', lineNum: 103});});
    const result = await getData().then(col => col.deleteOne({_id: _id}));
    if(!result.acknowledged) throw new MyError(500, 'Failed to delete: result not acknowledged', {fileName: 'models/workouts.js', lineNum: 105});
    return workout;
}

/**
 * @param {newWorkout} newWorkout
 * @returns Promise<Workout>
 */
async function create(newWorkout) {
    "use strict";
    const users = await getData();
    const result = await users.insertOne(newWorkout).catch(err => {throw new MyError(500, err.message, {fileName: 'models/workouts.js', lineNum: 116});});
    if(!result.acknowledged) throw new MyError(500, 'Failed to delete: result not acknowledged', {fileName: 'models/workouts.js', lineNum: 117});
    return await users.findOne({_id: result.insertedId});
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