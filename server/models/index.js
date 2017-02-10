'use strict';
  let fs = require('fs');
  let path = require('path');
  let Sequelize = require('sequelize');
  let basename = path.basename(module.filename);
  const config = require('../config/env/config')();
  let env = config.env || 'development';
  let db = {};
  let sequelize;

  if (config.db_url) {
    sequelize = new Sequelize(config.db_url);
  } else {
    sequelize = new Sequelize(config.db, config.username, config.password);
  }
fs
      .readdirSync(__dirname)
      .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
      })
      .forEach((file) => {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
      });
Object.keys(db).forEach(function (modelName) {
      if (db[modelName].associate) {
          db[modelName].associate(db);
      }
  });
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  module.exports = db;
