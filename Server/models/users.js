/**@typedef {import('../../Client/src/model/users').User} User*/
/**@typedef {import('../../Client/src/model/users').newUser} newUser*/

 /**@type {{items: User[], total: number, skip: number, limit: number}}*/
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
    const users = data.items
    if (users.some(user => user.email === inputInfo.email)) throw new Error('Email already exists', {cause: {status: 400}});
    if (users.some(user => user.username === inputInfo.username)) throw new Error('Username already exists', {cause: {status: 400}});
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
    const users = data.items
    const user = users.find(item => item.id === id);
    if (!user) throw new Error('User not found', {cause: {status: 404}});
    return users.find(item => item.id === id);
}

/**
 * @param {string} q
 * @returns {Promise<User[]>}
 */
async function search(q) {
    const users = data.items
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
    const users =  data.items;
    const user = users.find(item => item.id === id);
    if (!user) throw new Error('User not found', {cause: {status: 404}});
    for (let key in inputInfo) user[key] = inputInfo[key];
    return user;

}

/**
 * @param {number} id
 * @returns Promise<User>
 */
async function destroy(id) {
    const user = await get(id);
    if(!user) throw new Error('User not found', {cause: {status: 404}});
    data.items.splice(data.items.findIndex(item => item.id === id), 1);
    return user;
}


/**
 * @param {string} emailOrUsername
 * @param {string} password
 * @returns {Promise<User>}
 */
async function login(emailOrUsername, password) {
    const users = data.items;
    const user = await users.find(user => (user.email === emailOrUsername || user.username === emailOrUsername));
    if (!user || user.password !== password) throw new Error('Invalid login credentials. Please try again.', {cause: {status: 401}});
    return user;
}

module.exports = {create, getAll, get, search, update, destroy, login}