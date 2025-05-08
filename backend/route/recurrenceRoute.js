const { createRecurrence, getRecurrence, updateRecurrence,deleteRecurrence } = require('../controller/recurrenceController');
const {authenticate}=require('../controller/authController');

const router = require('express').Router();

router.route('/create').post(authenticate,createRecurrence);

router.route('/get/:taskId').get(authenticate,getRecurrence);

router.route('/update/:taskId').patch(authenticate,updateRecurrence);

router.route('/delete/:taskId').delete(authenticate,deleteRecurrence);

module.exports = router;