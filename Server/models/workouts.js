/** @typedef {import('../../Client/src/model/workouts').Workout} Workout*/
/** @typedef {import('../../Client/src/model/workouts').NewWorkout} NewWorkout*/
/**
 * @typedef {Object} data
 * @property {Workout[]} items
 * @property {number} total
 * @property {number} skip
 * @property {number} limit
 */
/**@type {{items: Workout[], total: number, skip: number, limit: number}}*/
const data = require('../data/workouts.json');

/**
 * @description Get all workouts
 * @returns {Promise<Workout[]>}
 */
async function getAll() {
    return data.items;
}
/**
 * @description Get all workouts by a specific user
 * @param {number} userid
 * @returns {Promise<Workout[]>}
 */
async function getWorkoutsByUser(userid){
    const workouts = data.items;
    return data.items.filter(workout => workout.user.id === userid);
}
/**
 * @description Search for workouts given a query
 * @param {string} q
 * @returns {Promise<Workout[]>}
 */
async function search(q) {
    return data.items.filter(item =>
        new RegExp(q, 'i').test(item.title) ||
        new RegExp(q, 'i').test(item.location) ||
        new RegExp(q, 'i').test(item.type));
}

/**
 * @description update a workout
 * @param {number} id
 * @param {Object} body
 * @returns Promise<Workout>
 */
async function update(id, body) {
    const workout = data.items.find(workout => workout.id === id);
    if (!workout) return null;
    for(let key in body) workout[key] = body[key];
    return workout;
}
/**
 * @param {number} id
 * @returns Promise<Workout>
 */
async function destroy(id) {
    /** @type {Workout} */
    const workout = await data.items.find(workout => workout.id === id);
    if (!workout) throw new Error("Workout not found", {cause:{status: 404}});
    /** @type {Workout} workout */
    data.items = data.items.filter(workout => workout.id !== id);
    return workout;
}

/**
 * @param {newWorkout} newWorkout
 * @returns Promise<Workout>
 */
async function create(newWorkout) {
    const workouts = data.items;
    /**@type {Workout}*/
    const workout = {
        id: workouts[workouts.length-1].id + 1,
        ...newWorkout
    };
    data.items.push(workout);
    return workout;
}

module.exports = {
    getAll,
    getWorkoutsByUser,
    search,
    update,
    destroy,
    create
}