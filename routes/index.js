const router = require('express').Router();

router.use('/', require('./swagger'))
router.get('/', (req, res)  => {res.send('hello world')});

router.use('/contacts', require('./users'));
router.use('/users', require('./users'));

module.exports = router;