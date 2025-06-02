const { sequelize } = require('./sequelize')
const Video = require('../models/video')
const Category = require('../models/category')

Video.belongsToMany(Category, { 
    through: 'categoryAsVideo',
    foreignKey: 'fkVideo',
    other: 'fkCategory'
})
Category.belongsToMany(Video, { 
    through: 'categoryAsVideo',
    foreignKey: 'fkCategory',
    other: 'fkVideo' 
})

async function init(){
    try{
        await sequelize.authenticate()
        console.log('connexion to db successfull')
    } catch(error){
        console.error(`unable to connect to db : ${error}`)
    }
}
module.exports = init