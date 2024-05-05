const { databaseConfig } = require('./src/config/config'); 

module.exports = {
  development: {
    ...databaseConfig, 
    dialect: 'postgres', 
    migrationStorageTableName: 'sequelize_meta', 
    seederStorage: 'sequelize', 
  },
};