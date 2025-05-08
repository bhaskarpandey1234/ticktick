'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recurrence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recurrence.belongsTo(models.Task, { foreignKey: 'taskId' });
    }
  }
  Recurrence.init({
    frequency: DataTypes.STRING,
    interval: DataTypes.INTEGER,
    daysOfWeek: DataTypes.ARRAY(DataTypes.STRING),
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    taskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recurrence',
    freezeTableName: true,
  });


  return Recurrence;
};