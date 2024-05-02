MyError = require("./MyError");
const {connect} = require('./mongo');
/**@typedef {import('../../Client/src/model/users').User} User*/
/**@typedef {import('../../Client/src/model/users').newUser} newUser*/

const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

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
    const users = await getData();
    if (await users.findOne({email: inputInfo.email})) throw new MyError(400, 'Email already exists');
    if (await users.findOne({username: inputInfo.username})) throw new MyError(400, 'Username already exists');
    /** @type {User} */
    const newUser = {
        admin: false,
        ...inputInfo,
        friends: []
    };
    const result = await users.insertOne(newUser);
    if(!result.acknowledged) throw new MyError(500, 'Insert failed: result not acknowledged');
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
    if (!user) {throw new MyError(404, 'User not found');}
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
        }).toArray());
}

/**
 * @param {import('mongodb').ObjectId} _id
 * @param {newUser} inputInfo
 * @returns {Promise<User>}
 */
async function update(_id, inputInfo) {
    "use strict";
    const users = await getData();
    /** @type {User} */
    const user= await users.findOne({_id:_id});
    if (!user) throw new MyError(404, 'User not found');
    delete inputInfo._id;
    const result = await users.updateOne({_id: _id}, {$set: inputInfo});
    if(!result.acknowledged) throw new MyError(500, 'Update failed: result not acknowledged');
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
    const user = await col.findOne({_id: _id});
    if (!user) throw new MyError(404, 'User not found');
    await getData().then(col => col.deleteOne({_id: _id}));
    return user;
}
/**
 * @param {User} user
 * @returns {Promise<string>}
 */
async function generateToken(user) {
    "use strict";
    return new Promise((resolve, reject) => {
        jwt.sign(user, jwtSecret, {expiresIn: jwtExpiresIn}, (err, token) => {
            if (err) return reject(err);
            resolve(token);
        });
    });
}
/**
 * @param {string} token
 * @returns {Promise<User>}
 */
async function verifyToken(token) {
    "use strict";
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
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
        }));
    if(!user || user.password !== password) throw new MyError(401,'Invalid login credentials. Please try again.');
    const token = await generateToken(user);
    return {user, token};
}

module.exports = {
    create,
    getAll,
    get,
    search,
    update,
    destroy,
    login,
    seed,
    verifyToken,
};