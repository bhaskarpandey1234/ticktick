const { User, Role } = require('../db/models');

exports.getProfile = async (req, res) => {
  console.log(req.user,"get user");
    try {
      const user = await User.findByPk(req.user.userId, {
        attributes: ['id', 'email', 'fullName'],
        include: [{ model: Role, as: 'roles', attributes: ['name'] }],
      });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  