'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {

    static associate(models) {
      Invoices.belongsTo(models.payments, {
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