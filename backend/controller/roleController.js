const { Role, User } = require('../db/models');

exports.createRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    const role = await Role.create({ name, description });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);
    if (!user || !role) return res.status(404).json({ message: 'User or Role not found' });

    await user.addRole(role);
    res.json({ message: 'Role assigned to user successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
