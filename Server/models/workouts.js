/**
 * Workout Model
 * @typedef {Object} Workout
 * @property {Object} user
 * @property {number} id
 * @property {string} title
 * @property {number} time
 * @property {number} duration
 * @property {number} distance
 * @property {number} calories
 * @property {string} location
 * @property {string} imageURL
 * @property {string} type
 * @property {Array<string>} comments
 */
/**
 * @typedef {Object} data
 * @property {Workout[]} items
 * @property {number} total
 * @property {number} skip
 * @property {number} limit
 */
const data = require('../data/workouts.json');
const session = require

/**
 * @returns {Promise<Workout[]>}
 */
async function getAll() {
    return await data.items;
}
/**
 * @param {number} userid
 * @returns {Promise<Workout[]>}
 */
async function getWorkoutsByUser(userid){
    return await data.items.filter(workout => workout.user.id === userid);
}
/**
 * @param {string} q
 * @returns {Promise<Workout[]>}
 */
async function search(q) {
    return await data.items.filter(item =>
        new RegExp(q, 'i').test(item.title) ||
        new RegExp(q, 'i').test(item.location) ||
        new RegExp(q, 'i').test(item.type));
}

/**
 * @param {number} id
 * @param {Object} body
 * @returns Promise<{Workout}>
 */
async function edit(id, body) {
    /** @type {Workout} */
    const workout = data.items.find(workout => workout.id === id);
    if (!workout) return null;
    for(let key in body) workout[key] = body[key];
    return workout;
}
/**
 * @param {number} id
 * @returns Promise<{Workout}>
 */
async function remove(id) {
    /** @type {Workout} */
    getWorkoutsByUser()
    if (!workout) return null;
    /** @type {Workout} workout */
    data.items = data.items.filter(workout => workout.id !== id);
    return workout;
}

/**
 * @param {Workout} workout
 * @returns Promise<{Workout}>
 */
async function addNewWorkout(workout) {
    workout.id = await getWorkoutsByUser(session.user.id).length + 1;
    data.items.push(workout);
    return workout;
}




module.exports = {
    getAll,
    getWorkoutsByUser,
    search,
    edit,
    remove,
    addNewWorkout
}