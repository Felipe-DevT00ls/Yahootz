const Sequelize = require("sequelize")
const connection = require("../database/database")

const Response = connection.define("resposta", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Response.sync({force: false}).then(()=>{})
module.exports = Response