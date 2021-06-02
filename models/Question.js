const Sequelize = require("sequelize")
const connection = require("../database/database")

const Question = connection.define("pergunta", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Question.sync({force: false})
    .then(()=>{})
    .catch(()=>{
        console.log("erro ao criar tabela")
    })

module.exports = Question