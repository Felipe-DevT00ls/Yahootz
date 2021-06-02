const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Question = require("./models/Question")
const Response = require("./models/Response")

connection
    .authenticate()
        .then(()=>{
            console.log("conectado")
        })
        .catch(()=>{
            console.log("erro ao conectar")
        })


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))


app.listen(3000,()=>{})


app.get("/", (req,res)=>{
    res.render("index")
})

app.get("/question", (req,res)=>{
    res.render("perguntar.ejs")
})

app.get("/question/:id", (req,res)=>{
    let {id} = req.params
    Question.findOne({
        where: {id: id}
    }).then(question=>{
        if(question != undefined){
            Response.findAll({where: {perguntaId: question.id}}).then(responses=>{
                res.render("responderPergunta", {
                    question,
                    responses
                })
            })
        }else{
            res.redirect("/results")
        }
    })
})

app.post("/save", (req,res)=>{
    const {title, msg} = req.body
    Question.create({
        title: title,
        description: msg
    }).then(()=>{
        res.redirect("/results")
    }).catch((e)=>{
        res.send(e)
    })
})

app.get("/results", (req,res)=>{
    Question.findAll({raw: true, order: [['id', 'DESC']]}).then(question=>{
        res.render("pergunta", {
            question: question
        })
    })
})

app.post("/response", (req,res)=>{
    let {corpo, perguntaId} = req.body
    Response.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/question/"+perguntaId)
    })
})