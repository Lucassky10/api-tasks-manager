var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var app = express();
var port = 8090;
var payloadChecker = require('payload-validator');
const { addTask, updateTask, deleteTask, getTask, getTasks } = require('./db/db');


var expectedPayload = {
    "title": "newTask",
    "beginDate": "",
    "endDate": "11/23/2020",
    "status": "ENDED",
    "tags": ["school", "deadline", "project"]
};


app.use(require('body-parser').json())
.use(require('body-parser').urlencoded({ extended: true }))

.get('/tasks', (req, res) => {
    getTasks().then(tasks => {
        res.json(tasks);
    })
})

.get('/task/:id', (req, res) => {
    let id = req.params.id;
    getTask(id).then(task => {
        res.json(task);
    }).catch(() => {
        res.status(404);
        res.json(
            { 
                status: 404, 
                message:"Task not found"
            }
        );
    })
})

.post('/task', (req, res) => {

    addTask(req.body).then(id => {
        res.json({id});
    }).catch((err)=>{
        res.json(err);
    });
})

.put('/task/:id', (req, res) => {

    let id = req.params.id;

    getTask(id).then(() => {

        updateTask(id, req.body).then(()=>{
            res.status(200);
            res.end();
        }).catch((err)=>{
            res.end();
        });

    }).catch(() => {

        res.status(404);
        res.json(
            {
                status:404,
                message:"Task not found"
            }
        )

    });
    
})

.delete('/task/:id', (req, res) => {

    let id = req.params.id;
    
    getTask(id).then(()=>{
        deleteTask(id).then(()=>{
            res.end();
        }).catch((err)=>{
            res.json(err);
        })
    }).catch(()=>{
        res.status(404);
        res.json(
            {
                status:404,
                message:"Task not found"
            }
        )
    });
})

// Not supported methods

.get('/task', (_req, res) => {
    res.json({"message" : "GET not supported"});
})

.post('/task/:id', (_req, res) => {
    res.json({"message" : "POST not supported"});
})

.listen(port, () => {
    console.log('Listening on ' + port);
});