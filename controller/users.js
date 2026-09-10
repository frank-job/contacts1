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

const createUsers = async(req, res) => {
  const user = {
    email: req.body.email,
    userName: req.body.userName,
    ipaddress: req.body.ipaddress
    }

    const response = await mongodb.getDatabase().collection('users').insertOne(user)

    if(response.acknowledged ) {
          res.status(201).json(response.insertedId);
    } else {
        res.status(500).json(response.error || 'Error when Creating user')
    }
  

}



const updateUsers = async(req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    email: req.body.email,
    userName: req.body.userName,
    ipaddress: req.body.ipaddress
  
    }

    const response = await mongodb.getDatabase().collection('users').replaceOne({_id: userId}, user)
    if(response.modifiedCount > 0) {
          res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error when updating user')
    }
  

}

const deleteUsers = async(req, res) => {
  const userId = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase().collection('users').deleteOne({_id: userId})
    if(response.deletedCount > 0) {
          res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error when deleting user')
    }
  

}


module.exports = {
    getAll,
    getSingle,
    createUsers,
    updateUsers,
    deleteUsers
};