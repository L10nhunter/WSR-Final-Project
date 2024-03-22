/**
 * User Model
 * @typedef {Object} User
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} username
 * @property {string} password
 * @property {string} imageURL
 * @property {Array<string>} friends
 **/

/** @type {{items: User[], total: number, skip: number, limit: number}}*/
const data = require('../data/users.json');

function getAll() {
    return data.items;
}

/**
 * @param id
 * @returns {User}
 */
function get(id) {
    return data.items.find(item => item.id === id);
}

/**
 * @param {string} searchTerm
 * @returns {User[]}
 */
function search(searchTerm) {
    return data.items.filter(item =>
        new RegExp(searchTerm, 'i').test(item.firstName) ||
        new RegExp(searchTerm, 'i').test(item.lastName) ||
        new RegExp(searchTerm, 'i').test(item.email));
}

module.exports = {
    getAll,
    get,
    search
}