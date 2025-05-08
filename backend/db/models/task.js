'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.hasOne(
        models.Recurrence, { foreignKey: 'taskId' }
      );
      Task.belongsTo(models.User, { foreignKey: 'userId' });

    }
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    dueDate: DataTypes.DATE,
    isCompleted: DataTypes.BOOLEAN,
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
      defaultValue: 'pending'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium'
    },
    userId: {  // Foreign key to the User model
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
   {
    sequelize,
    modelName: 'Task',
    freezeTableName: true,
  });
  
 

  return Task;
};

