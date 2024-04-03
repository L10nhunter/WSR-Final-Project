/**
 * @typedef {import('../../Client/src/model/users').User} User
 * @typedef {import('../../Client/src/model/users').newUser} newUser
 * @typedef {Object} data
 * @property {User[]} items
 * @property {number} total
 * @property {number} skip
 * @property {number} limit
 */
const data = require('../data/users.json');

/**
 * @returns {Promise<User[]>}
 */
async function getAll() {
    return await data.items.map(item => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        username: item.username,
        admin: item.admin,
        friends: item.friends
    }));
}

/**
 * @param {number} id
 * @returns Promise<User>
 */
async function get(id) {
    return await data.items.find(item => item.id === id);
}

/**
 * @param {string} q
 * @returns {Promise<User[]>}
 */
async function search(q) {
    return await data.items.filter(item =>
        new RegExp(q, 'i').test(item.firstName) ||
        new RegExp(q, 'i').test(item.lastName) ||
        new RegExp(q, 'i').test(item.email));
}

/**
 * @param {number} id
 * @returns Promise<User>
 */
async function remove(id) {
    /** @type {User} */
    const user = await get(id);
    data.items.splice(data.items.findIndex(item => item.id === id), 1);
    return user;
}

/**
 * @param {newUser} inputInfo
 * @returns {Promise<User>}
 */
async function addNewUser(inputInfo) {
    const users = await data.items
    /** @type {User} */
    const newUser = {
        id: users[users.length - 1].id + 1,
        admin: false,
        ...inputInfo,
        friends: []
    };

    data.push(newUser);
    return newUser;
}

/**
 * @param {string} emailOrUsername
 * @param {string} password
 * @returns {Promise<User>}
 */
async function login(emailOrUsername, password) {
    const users = await data.items;
    const user = users.find(user => (user.email === emailOrUsername || user.username === emailOrUsername));
    if (!user || user.password !== password) return users.find(user => (user.id === -1));
    return user;
}

module.exports = {getAll, get, remove, search, addNewUser, login}