const {MongoClient, ServerApiVersion, Collection} = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connect() {
    "use strict";
    await client.connect();
    return client.db(process.env.MONGO_DB_NAME);
}

module.exports = {connect, Collection};
