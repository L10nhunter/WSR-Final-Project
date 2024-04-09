/** @typedef {import('../../Client/src/model/workouts').Workout} Workout*/
/** @typedef {import('../../Client/src/model/workouts').NewWorkout} NewWorkout*/

const getUser = require("./users").get;
const {connect} = require("./mongo");

/**
 * @return {Promise<Collection<Workout>>}
 */
async function getData() {
    return await connect()
        .then(db => db.collection('Workouts'))
        .catch(err => {throw new Error(err.message, {cause: {status: 500}});});
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
    const user= await getUser(userid).catch(err => {throw new Error(err.message, {cause: {status: 500}});});
    if(!user) throw new Error('User not found', {cause: {status: 404}});
    return await getData()
        .then(workouts => {
            return workouts.find({"user._id": userid}).toArray();
        })
        .catch(err => {throw new Error(err.message, {cause: {status: 500}});});
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
            throw new Error(err.message, {cause: {status: 500}});
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
        .catch(err => {throw new Error(err.message, {cause: {status: 500}});});
    const workout = await workouts.findOne({_id:_id})
        .catch(err => {throw new Error(err.message, {cause: {status: 404}});});
    if (!workout) throw new Error('Workout not found', {cause: {status: 404}});
    const result = await workouts.updateOne({_id: _id}, {$set: body});
    if(!result.acknowledged) throw new Error('Update failed', {cause: {status: 500}});
    return await workouts.findOne({_id:_id});
}
/**
 * @param {import('mongodb').ObjectId} _id
 * @returns Promise<Workout>
 */
async function destroy(_id) {
    const col = await getData();
    /** @type {Workout} */
    const workout = await col.findOne({_id: _id}).catch(err => {throw new Error(err.message, {cause: {status: 404}});});
    await getData().then(col => col.deleteOne({_id: _id}));
    return workout;
}

/**
 * @param {newWorkout} newWorkout
 * @returns Promise<Workout>
 */
async function create(newWorkout) {
    const users = await getData();
    const result = await users.insertOne(newWorkout);
    if(!result.acknowledged) throw new Error('Insert failed', {cause: {status: 500}});
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