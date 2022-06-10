const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const cors = require('cors');
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

app.get('/',(req, res)=>{
    db.collection('exercises').find().toArray()
    .then(data => {res.render('index.ejs', { info: data })}
    )
})

app.post('/api/addExercise',(req, res)=>{
    req.body.likes = 0
    db.collection('exercises').insertOne(req.body)
    res.redirect('/')
})

app.put('/api/updateExercise',(req, res)=>{
    db.collection('exercises').updateOne( {_id : ObjectID(req.body._id) },{
        $set: {
            likes: req.body.currentLikes + 1
        }
    })
    .then(result => {
        res.json("Exercise Updated")
    })
    .catch(error => console.log(error))
})


app.delete('/api/deleteExercise',(req, res)=>{
    db.collection('exercises').deleteOne( {_id : ObjectID(req.body._id) })
    .then(result => {
        res.json("Exercise Deleted")
    })
    .catch(error => console.log(error))
})




app.listen(3000, function() {
    console.log('listening on 3000')
  })    