const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const cors = require('cors');
var bodyParser = require('body-parser')
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'bfit_workout'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    .catch(error => console.error(error))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',(request, response)=>{
        response.render('index.ejs')
})

app.post('/api/addExercise',(request, response)=>{
    // db.collection('exercises').inse
    console.log(request.body)
    response.redirect('/')

})

app.listen(3000, function() {
    console.log('listening on 3000')
  })    