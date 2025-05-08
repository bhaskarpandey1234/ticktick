const { createRole, getRoles, assignRoleToUser } = require('../controller/roleController');

const router = require('express').Router();

router.route('/create').post(createRole);

router.route('/get').get(getRoles);

router.route('/assign').post(assignRoleToUser);


module.exports = router;