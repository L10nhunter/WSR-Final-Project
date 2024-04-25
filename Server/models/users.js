MyError = require("./MyError");
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
        _id: item._id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        phone: item.phone,
        username: item.username,
        password: '********',
        admin: item.admin,
        friends: item.friends,
    }));
}
/**
 * @param {newUser} inputInfo
 * @returns {Promise<User>}
 */
async function create(inputInfo) {
    "use strict";
    const users = await getData().catch(err => {throw new MyError(500, err.message,{fileName: 'models/users.js', lineNum: 53});});
    if (await users.findOne({email: inputInfo.email})) throw new MyError(400, 'Email already exists', {fileName: 'models/users.js', lineNum: 54});
    if (await users.findOne({username: inputInfo.username})) throw new MyError(400,'Username already exists', {fileName: 'models/users.js', lineNum: 55});
    /** @type {User} */
    const newUser = {
        admin: false,
        ...inputInfo,
        friends: []
    };
    const result = await users.insertOne(newUser).catch(err => {throw new MyError(500, err.message, {fileName: 'models/users.js', lineNum: 62});});
    if(!result.acknowledged) throw new MyError(500, 'Insert failed: result not acknowledged', {fileName: 'models/users.js', lineNum: 63});
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
    if (!user) {throw new MyError(404, 'User not found', {fileName: 'models/users.js', lineNum: 74});}
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
                {username: {$regex: q, $options: 'i'}},
                {email: {$regex: q, $options: 'i'}},
            ],
        }).toArray())
        .catch(err => {throw new MyError(500, err.message, {fileName: 'models/users.js', lineNum: 93});});
}

/**
 * @param {import('mongodb').ObjectId} _id
 * @param {newUser} inputInfo
 * @returns {Promise<User>}
 */
async function update(_id, inputInfo) {
    "use strict";
    const users = await getData()
        .catch(err => {throw new MyError(500, err.message, {fileName: 'models/users.js', lineNum: 104});});
    /** @type {User} */
    const user= await users.findOne({_id:_id})
        .catch(err => {throw new MyError(500, err.message, {fileName: 'models/users.js', lineNum: 107});});
    if (!user) throw new MyError(404, 'User not found', {fileName: 'models/users.js', lineNum: 108});

    const result = await users.updateOne({_id: _id}, {$set: inputInfo});
    if(!result.acknowledged) throw new MyError(500, 'Update failed: result not acknowledged', {fileName: 'models/users.js', lineNum: 111});

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
    const user = await col.findOne({_id: _id}).catch(err => {throw new MyError(500, err.message, {fileName: 'models/users.js', lineNum: 125});});
    if (!user) throw new MyError(404, 'User not found', {fileName: 'models/users.js', lineNum: 126});
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
        .catch(err => {throw new MyError(500, err.message, {fileName: 'models/users.js', lineNum: 146});});
    if(!user || user.password !== password) throw new MyError(401,'Invalid login credentials. Please try again.', {fileName: 'models/users.js', lineNum: 147});
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