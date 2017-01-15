import * as ORM from 'sequelize';
import {Sequelize} from 'sequelize';

export function initUserModel(sequelize: Sequelize) {
  return sequelize.define('Users', {
    id: {
      type: ORM.STRING,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: ORM.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: ORM.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }
  })
}
