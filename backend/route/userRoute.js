const { getProfile } = require('../controller/userController');
const {authenticate}=require('../controller/authController');

const router = require('express').Router();

router.route('/get-profile').get(authenticate,getProfile);

module.exports = router;