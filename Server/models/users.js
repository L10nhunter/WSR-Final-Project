const MyError = require('../../Client/src/model/myError').MyError;
const {connect} = require('./mongo');
/**@typedef {import('../../Client/src/model/users').User} User*/
/**@typedef {import('../../Client/src/model/users').newUser} newUser*/

/** @return {Promise<Collection<User>>}*/
async function getData() {
    "use strict";
    const db = await connect();
    return db.collection('Users');
}

async function seed() {
    "use strict";
    const col = await getData();
    await col.insertMany(require('../data/users.json').items);
}

/**
 * @returns {Promise<User[]>}
 */
async function getAll() {
    "use strict";
    /**@type {User[]} */
    const users = await getData().then(col => col.find({}).toArray());
    return users.map(item => ({
        /**@type {import('mongodb').ObjectId} */
        _id: item._id,
        /**@type {string} */
        firstName: item.firstName,
        /**@type {string} */
        lastName: item.lastName,
        /**@type {string} */
        email: item.email,
        /**@type {string} */
        phone: item.phone,
        /**@type {string} */
        username: item.username,
        /**@type {boolean} */
        admin: item.admin,
        /**@type {import('mongodb').ObjectId[]} */
        friends: item.friends
    }));
}
/**
 * @param {newUser} inputInfo
 * @returns {Promise<User>}
 */
async function create(inputInfo) {
    "use strict";
    const users = await getData().catch(err => {throw new MyError(err.message, {status: 500, message: "Internal Server Error"});});
    if (await users.findOne({email: inputInfo.email})) throw new MyError('Email already exists', {status: 400, message: "Bad Request"});
    if (await users.findOne({username: inputInfo.username})) throw new MyError('Username already exists', {status: 400, message: "Bad Request"});
    /** @type {User} */
    const newUser = {
        admin: false,
        ...inputInfo,
        friends: []
    };
    const result = await users.insertOne(newUser).catch(err => {throw new MyError(err.message, {status: 500, message: "Internal Server Error"});});
    if(!result.acknowledged) throw new MyError('Insert failed', {status: 400, message: "Bad Request"});
    newUser._id = result.insertedId;
    return newUser;
}

/**
 * @param {import('mongodb').ObjectId} _id
 * @returns Promise<User>
 */
async function get(_id) {
    "use strict";
    const user = await getData().then(col => col.findOne({_id: _id}));
    if (!user) throw new MyError('User not found', {status: 404, message: "Not Found"});
    return user;
}

/**
 * @param {string} q
 * @returns {Promise<User[]>}
 */
async function search(q) {
    "use strict";
    return await getData()
        .then(col => col.find({
            $or: [
                {firstName: {$regex: q, $options: 'i'}},
                {lastName: {$regex: q, $options: 'i'}},
                {email: {$regex: q, $options: 'i'}},
            ],
        }).toArray())
        .catch(err => {
            throw new MyError(err.message, {status: 500, message: "Internal Server Error"});
        });
}

/**
 * @param {import('mongodb').ObjectId} _id
 * @param {newUser} inputInfo
 * @returns {Promise<User>}
 */
async function update(_id, inputInfo) {
    "use strict";
    const users = await getData()
        .catch(err => {throw new MyError(err.message, {status: 500, message: "Internal Server Error"});});
    /** @type {User} */
    const user= await users.findOne({_id:_id})
        .catch(err => {throw new MyError(err.message, {status: 404, message: "Not Found"});});
    if (!user) throw new MyError('User not found', {status: 404, message: "Not Found"});

    const result = await users.updateOne({_id: _id}, {$set: inputInfo});
    if(!result.acknowledged) throw new MyError('Update failed', {status: 500, message: "Internal Server Error"});

    return await users.findOne({_id:_id});

}

/**
 * @param {import('mongodb').ObjectId} _id
 * @returns Promise<User>
 */
async function destroy(_id) {
    "use strict";
    const col = await getData();
    /**@type {User}*/
    const user = await col.findOne({_id: _id}).catch(err => {throw new MyError(err.message, {status: 404, message: "Not Found"});});
    await getData().then(col => col.deleteOne({_id: _id}));
    return user;
}


/**
 * @param {string} emailOrUsername
 * @param {string} password
 * @returns {Promise<User>}
 */
async function login(emailOrUsername, password) {
    "use strict";
    /**@type {User}*/
    const user = await getData()
        .then(col => col.findOne({
            $or: [
                {email: emailOrUsername},
                {username: emailOrUsername}
            ],
        }))
        .catch(err => {throw new MyError(err.message, {status: 500, message: "Internal Server Error"});});
    if(!user) throw new MyError('Invalid login credentials. Please try again.', {status: 401, message: "Unauthorized"});
    if (user.password !== password) throw new MyError('Invalid login credentials. Please try again.', {status: 403, message: "Forbidden"});
    return user;
}

module.exports = {
    create,
    getAll,
    get,
    search,
    update,
    destroy,
    login,
    seed
};