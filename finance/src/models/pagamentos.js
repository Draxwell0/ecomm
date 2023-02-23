'use strict';

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    static associate(models) {
      Payments.hasOne(models.Invoices, {
        foreignKey: 'idPagamento',
      });
    }
  }
  Payments.init({
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        min: 1,
      },
    },
    nome: DataTypes.STRING,
    numeroCartao: {
      type: DataTypes.STRING,
      validate: {
        isInt: true,
        len: [16, 16],
      },
    },
    dataExpiracao: {
      type: DataTypes.DATEONLY,
      validate: {
        is: /^[0-9]{4}-[0-9]{2}-01$/,
      },
    },
    cvv: {
      type: DataTypes.STRING,
      validate: {
        isInt: true,
        len: [3, 3],
      },
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['criado', 'confirmado', 'cancelado']],
      },
    },
  }, {
    sequelize,
    modelName: 'Payments',
  });
  return Payments;
};
