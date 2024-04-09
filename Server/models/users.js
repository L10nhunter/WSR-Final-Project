const {connect} = require('./mongo');
/**@typedef {import('../../Client/src/model/users').User} User*/
/**@typedef {import('../../Client/src/model/users').newUser} newUser*/

/** @return {Promise<Collection<User>>}*/
async function getData() {
    const db = await connect();
    return db.collection('Users');
}

async function seed() {
    const col = await getData();
    await col.insertMany(require('../data/users.json').items);
}

/**
 * @returns {Promise<User[]>}
 */
async function getAll() {
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
    const users = await getData().catch(err => {throw new Error(err.message, {cause: {status: 500}});});
    if (await users.findOne({email: inputInfo.email})) throw new Error('Email already exists', {cause: {status: 400}});
    if (await users.findOne({username: inputInfo.username})) throw new Error('Username already exists', {cause: {status: 400}});
    /** @type {User} */
    const newUser = {
        admin: false,
        ...inputInfo,
        friends: []
    };
    const result = await users.insertOne(newUser);
    if(!result.acknowledged) throw new Error('Insert failed', {cause: {status: 400}});
    newUser._id = result.insertedId;
    return newUser;
}

/**
 * @param {import('mongodb').ObjectId} _id
 * @returns Promise<User>
 */
async function get(_id) {
    const user = await getData().then(col => col.findOne({_id: _id}));
    if (!user) throw new Error('User not found', {cause: {status: 404}});
    return user;
}

/**
 * @param {string} q
 * @returns {Promise<User[]>}
 */
async function search(q) {
    return await getData()
        .then(col => col.find({
            $or: [
                {firstName: {$regex: q, $options: 'i'}},
                {lastName: {$regex: q, $options: 'i'}},
                {email: {$regex: q, $options: 'i'}},
            ],
        }).toArray())
        .catch(err => {
            throw new Error(err.message, {cause: {status: 500}});
        });
}

/**
 * @param {import('mongodb').ObjectId} _id
 * @param {newUser} inputInfo
 * @returns {Promise<User>}
 */
async function update(_id, inputInfo) {
    const users = await getData()
        .catch(err => {throw new Error(err.message, {cause: {status: 500}});});
    /** @type {User} */
    const user= await users.findOne({_id:_id})
        .catch(err => {throw new Error(err.message, {cause: {status: 404}});});
    if (!user) throw new Error('User not found', {cause: {status: 404}});

    const result = await users.updateOne({_id: _id}, {$set: inputInfo});
    if(!result.acknowledged) throw new Error('Update failed', {cause: {status: 500}});

    return await users.findOne({_id:_id});

}

/**
 * @param {import('mongodb').ObjectId} _id
 * @returns Promise<User>
 */
async function destroy(_id) {
    const col = await getData();
    /**@type {User}*/
    const user = await col.findOne({_id: _id}).catch(err => {throw new Error(err.message, {cause: {status: 404}});});
    await getData().then(col => col.deleteOne({_id: _id}));
    return user;
}


/**
 * @param {string} emailOrUsername
 * @param {string} password
 * @returns {Promise<User>}
 */
async function login(emailOrUsername, password) {
    /**@type {User}*/
    const user = await getData()
        .then(col => col.findOne({
            $or: [
                {email: emailOrUsername},
                {username: emailOrUsername}
            ],
        }))
        .catch(err => {throw new Error(err.message, {cause: {status: 500}});});
    if(!user) throw new Error('Invalid login credentials. Please try again.', {cause: {status: 401}});
    if (user.password !== password) throw new Error('Invalid login credentials. Please try again.', {cause: {status: 403}});
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