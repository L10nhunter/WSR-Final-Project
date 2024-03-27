/**
 * User Model
 * @typedef {Object} User
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} username
 * @property {string} password
 * @property {string} image
 * @property {boolean} admin
 * @property {Array<string>} friends
 */
/**
 * newUser Model
 * @typedef {Object} newUser
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} username
 * @property {string} password
 * @property {string} image
 */


/**
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
    return await data.items;
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
 * @returns Promise<{User}>
 */
async function remove(id) {
    /** @type {User} */
    const user = await get(id);
    data.items.splice(data.items.findIndex(item => item.id === id), 1);
    return user;
}

/**
 * @param {newUser} inputInfo
 * @returns {User}
 */
async function addNewUser(inputInfo) {
    const data = await getAll()
    /** @type {User} */
    const newUser = {
        id: data[data.length - 1].id + 1,
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
    const users = await getAll();
    const user = users.find(user => (user.email === emailOrUsername || user.username === emailOrUsername));
    if (!user || user.password !== password) throw new Error('Invalid email or password');
    return user;
}

module.exports = {
    getAll,
    get,
    remove,
    search,
    addNewUser,
    login
}