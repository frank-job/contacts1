const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const contactCollection = () => mongodb.getDatabase().collection('contacts');

const contactFromBody = (body) => ({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    favoriteColor: body.favoriteColor,
    birthday: body.birthday
});

const getAll = async(req, res) => {
    const collection = contactCollection();
    const results = await collection.find();
    results.toArray().then((users) => {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(users);
    })
}

const getSingle = async(req, res) => {
    const userId = new ObjectId(req.params.id);

    const collection = contactCollection();
    const results = await collection.find({_id: userId});
    results.toArray().then((user) => {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(user[0]);
    })
}

const createUsers = async(req, res) => {
    const contact = contactFromBody(req.body);

        const response = await contactCollection().insertOne(contact)

    if(response.acknowledged ) {
          res.status(201).json(response.insertedId);
    } else {
        res.status(500).json(response.error || 'Error when Creating user')
    }
  

}



const updateUsers = async(req, res) => {
  const userId = new ObjectId(req.params.id);
    const contact = contactFromBody(req.body);

        const response = await contactCollection().replaceOne({_id: userId}, contact)
    if(response.modifiedCount > 0) {
          res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error when updating user')
    }
  

}

const deleteUsers = async(req, res) => {
  const userId = new ObjectId(req.params.id);

    const response = await contactCollection().deleteOne({_id: userId})
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