'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {

    static associate(models) {
      Invoices.belongsTo(models.Payments, {
        foreignKey: 'idPagamento'
      })
    }
  }
  Invoices.init({
    descricao: DataTypes.JSON,
    idPagamento: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invoices',
  });
  return Invoices;
};