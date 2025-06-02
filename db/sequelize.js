const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(
    'm2f',
    'root',
    'Delta456@',{
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2',
            multipleStatements: true,
            allowPublicKeyRetrieval: true,
            ssl: false
        },
        logging: false
    }
)
module.exports = { sequelize }