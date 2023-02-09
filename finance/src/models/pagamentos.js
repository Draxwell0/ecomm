'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payments extends Model {
    static associate(models) {
      // define association here
    }
  }
  payments.init({
    valor: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 1
      }
    },
    nome: DataTypes.STRING,
    numeroCartao: {
      type: DataTypes.STRING,
      validate:{
        isInt: true,
        len: [16, 16]
      }
    },
    dataExpiracao: {
      type: DataTypes.DATEONLY,
      validate: {
        is: /^[0-9]{4}-[0-9]{2}-01$/
      }
    },
    cvv: {
      type: DataTypes.STRING,
      validate: {
        isInt: true,
        len: [3, 3]
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        equals: 'Criado'
      }
    }
  }, {
    sequelize,
    modelName: 'payments',
  });
  return payments;
};