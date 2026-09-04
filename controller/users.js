const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    const collection = mongodb.getDatabase().collection('users');
    const results = await collection.find();
    results.toArray().then((users) => {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(users);
    })
}

const getSingle = async(req, res) => {
    const userId = new ObjectId(req.params.id);

    const collection = mongodb.getDatabase().collection('users');
    const results = await collection.find({_id: userId});
    results.toArray().then((user) => {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(user[0]);
    })
}

module.exports = {
    getAll,
    getSingle
};