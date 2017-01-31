import * as bcrypt from 'bcrypt';
import * as ORM from 'sequelize';
import {Sequelize} from 'sequelize';

export function initUserModel(sequelize: Sequelize) {
  const user = sequelize.define('User', {
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
      }
    },
    password: {
      type: ORM.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    classMethods: {
      validatePassword: (encryptedPassword, password) => bcrypt.compareSync(password, encryptedPassword)
    }
  });

  user.beforeCreate((user) => {
    return hashPass(user);
  })

  function hashPass(user) {
    const salt = bcrypt.genSaltSync(10);
    user.set('password', bcrypt.hashSync(user.password, salt));
  }

  return user;

}
