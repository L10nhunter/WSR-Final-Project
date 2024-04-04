/**@typedef {import('../../Client/src/model/users').User} User*/
/**@typedef {import('../../Client/src/model/users').newUser} newUser*/
 /**
 * @typedef {Object}
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
    /**@type {User[]}*/
    const users = await data.items;
    return users.map(item => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        phone: item.phone,
        username: item.username,
        admin: item.admin,
        friends: item.friends
    }));
}
/**
 * @param {newUser} inputInfo
 * @returns {Promise<User>}
 */
async function create(inputInfo) {
    /**@type {User[]}*/
    const users = await data.items
    if (users.some(user => user.email === inputInfo.email)) throw new Error('Email already exists');
    if (users.some(user => user.username === inputInfo.username)) throw new Error('Username already exists');
    /** @type {User} */
    const newUser = {
        id: users[users.length - 1].id + 1,
        admin: false,
        ...inputInfo,
        friends: []
    };
    data.items.push(newUser);
    return newUser;
}

/**
 * @param {number} id
 * @returns Promise<User>
 */
async function get(id) {
    /**@type {User[]}*/
    const users = await data.items
    const user = users.find(item => item.id === id);
    if (!user) throw new Error('User not found');
    return users.find(item => item.id === id);
}

/**
 * @param {string} q
 * @returns {Promise<User[]>}
 */
async function search(q) {
    /**@type {User[]}*/
    const users = await data.items
    return users.filter(item =>
        new RegExp(q, 'i').test(item.firstName) ||
        new RegExp(q, 'i').test(item.lastName) ||
        new RegExp(q, 'i').test(item.email));
}

/**
 * @param {number} id
 * @param {newUser} inputInfo
 * @returns {Promise<User>}
 */
async function update(id, inputInfo) {
    /**@type {User[]}*/
    const users = await data.items;
    const user = users.find(item => item.id === id);
    if (!user) throw new Error('User not found');
    for (let key in inputInfo) user[key] = inputInfo[key];
    return user;

}

/**
 * @param {number} id
 * @returns Promise<User>
 */
async function destroy(id) {
    /** @type {User} */
    const user = await get(id);
    if(!user) throw new Error('User not found');
    data.items.splice(data.items.findIndex(item => item.id === id), 1);
    return user;
}


/**
 * @param {string} emailOrUsername
 * @param {string} password
 * @returns {Promise<User>}
 */
async function login(emailOrUsername, password) {
    /**@type {User[]}*/
    const users = await data.items;
    const user = users.find(user => (user.email === emailOrUsername || user.username === emailOrUsername));
    if (!user || user.password !== password) throw new Error('Invalid login credentials. Please try again.');
    return user;
}

module.exports = {create, getAll, get, search, update, destroy, login}