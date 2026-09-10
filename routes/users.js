const express = require('express');
const router = express.Router();

const userControllers =  require('../controller/users')

router.get('/', userControllers.getAll);

router.get('/:id', userControllers.getSingle);

router.post('/', userControllers.createUsers)

router.put('/:id', userControllers.updateUsers)

router.delete('/:id', userControllers.deleteUsers)

module.exports = router;