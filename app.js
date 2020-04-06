var express = require('express');
var cors = require('cors');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var router = express.Router();
var app = express();
var port = 8090;
const { addTask, updateTask, deleteTask, getTask, getTasks, addTag, getTags } = require('./db/db');


app.use(cors());
app.use('/api', router);


router.use(require('body-parser').json())
.use(require('body-parser').urlencoded({ extended: true }))

.get('/tasks', (req, res) => {
    getTasks().then(tasks => {
        for(let i = 0; i<tasks.length; i++) {
            tasks[i].tags = JSON.parse(tasks[i].tags);
        }
        res.json(tasks);
    }).catch(err => {
        throw new Error(err);
    })
})

.get('/task/:id', (req, res) => {
    let id = req.params.id;
    getTask(id).then(task => {
        task[0].tags = JSON.parse(task[0].tags);
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

// Tags

.get('/tags', (req, res) => {
    getTags().then((tags) => {
        res.json(tags);
    }).catch((err)=>{
        res.json(err);
    })
})

.post('/tag', (req, res) => {
    addTag(req.body.name).then(()=>{
        res.end();
    }).catch((err)=>{
        res.json(err);
    });
})

// Not supported methods

.get('/task', (_req, res) => {
    res.json({"message" : "GET not supported"});
})

.post('/task/:id', (_req, res) => {
    res.json({"message" : "POST not supported"});
});

app.listen(port, () => {
    console.log('Listening on ' + port);
});