const { createTask, getTasks, updateTask, deleteTask, getTaskById } = require('../controller/taskController');
const {authenticate}=require('../controller/authController');
const router = require('express').Router();

router.route('/create').post(authenticate,createTask);

router.route('/get').get(authenticate,getTasks);

router.route('/update/:taskId').patch(authenticate,updateTask);

router.route('/delete/:taskId').delete(authenticate,deleteTask);

router.route('/:taskId').get(authenticate,getTaskById);

module.exports = router;