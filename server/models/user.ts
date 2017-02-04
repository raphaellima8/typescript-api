import * as bcrypt from 'bcrypt';
export default function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
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

  User.beforeCreate((user) => {
      return hashPass(user);
    })

    function hashPass(user) {
      const salt = bcrypt.genSaltSync(10);
      user.set('password', bcrypt.hashSync(user.password, salt));
    }
  return User;
};
