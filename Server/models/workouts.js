/** @typedef {import('../../Client/src/model/workouts').Workout} Workout*/
/** @typedef {import('../../Client/src/model/workouts').NewWorkout} NewWorkout*/

const getUser = require("./users").get;
const {connect} = require("./mongo");
const {MyError} = require("../../Client/src/model/myError");

/**
 * @return {Promise<Collection<Workout>>}
 */
async function getData() {
    return await connect()
        .then(db => db.collection('Workouts'))
        .catch(err => {throw new MyError(err.message, {status: 500, message: "Internal Server Error"});});
}

/**
 * @description Seed the workouts collection
 * @return {Promise<void>}
 */
async function seed() {
    const col = await getData();
    await col.insertMany(require('../data/workouts.json').items);
}

/**
 * @description Get all workouts
 * @returns {Promise<Workout[]>}
 */
async function getAll() {
    return await getData().then(col => col.find({}).toArray());
}

/** @param {import('mongodb').ObjectId} _id */
async function get(_id) {
    return await getData().then(col => col.findOne({_id: _id}));
}

/**
 * @description Get all workouts by a specific user
 * @param {import('mongodb').ObjectId} userid
 * @returns {Promise<Workout[]>}
 */
async function getWorkoutsByUser(userid){
    const user= await getUser(userid).catch(err => {throw new MyError(err.message, {status: 500, message: "Internal Server Error"});});
    if(!user) throw new MyError('User not found', {status: 404, message: "Not Found"});
    return await getData()
        .then(workouts => {
            return workouts.find({"user._id": userid}).toArray();
        })
        .catch(err => {throw new MyError(err.message, {status: 500, message: "Internal Server Error"});});
}
/**
 * @description Search for workouts given a query
 * @param {string} q
 * @returns {Promise<Workout[]>}
 */
async function search(q) {
    return await getData()
        .then(col => col.find({
            $or: [
                {title: {$regex: q, $options: 'i'}},
                {location: {$regex: q, $options: 'i'}},
                {type: {$regex: q, $options: 'i'}},
            ],
        }).toArray())
        .catch(err => {
            throw new MyError(err.message, {status: 500, message: "Internal Server Error"});
        });
}

/**
 * @description update a workout
 * @param {import('mongodb').ObjectId} _id
 * @param {Object} body
 * @returns Promise<Workout>
 */
async function update(_id, body) {
    const workouts = await getData()
        .catch(err => {throw new MyError(err.message, {status: 500, message: "Internal Server Error"});});
    const workout = await workouts.findOne({_id:_id})
        .catch(err => {throw new MyError(err.message, {status: 404, message: "Not Found"});});
    if (!workout) throw new MyError('Workout not found', {status: 404, message: "Not Found"});
    const result = await workouts.updateOne({_id: _id}, {$set: body}).catch(err => {throw new MyError(err.message, {status: 500, message: "Internal Server Error"});});
    if(!result.acknowledged) throw new MyError('Failed To Update', {status: 500, message: "Internal Server Error"});
    return await workouts.findOne({_id:_id});
}
/**
 * @param {import('mongodb').ObjectId} _id
 * @returns Promise<Workout>
 */
async function destroy(_id) {
    const col = await getData();
    /** @type {Workout} */
    const workout = await col.findOne({_id: _id}).catch(err => {throw new MyError(err.message, {status: 404, message: "Not Found"});});
    await getData().then(col => col.deleteOne({_id: _id}));
    return workout;
}

/**
 * @param {newWorkout} newWorkout
 * @returns Promise<Workout>
 */
async function create(newWorkout) {
    const users = await getData();
    const result = await users.insertOne(newWorkout).catch(err => {throw new MyError(err.message, {status: 500, message: "Internal Server Error"});});
    if(!result.acknowledged) throw new MyError("Creation Error", {status: 500, message: "Internal Server Error"});
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