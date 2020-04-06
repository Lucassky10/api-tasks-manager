var connection = undefined;

function getConnection() {
    let mysql = require('mysql')
    connection = mysql.createConnection({
        host:'localhost',
        port: '8889',
        user:'root',
        password:'root',
        database:'tasks'
    });

    connection.connect((err)=>{
        if(err) throw err;
        else console.log("Database is connected!")
    });

    return connection;
}

function disconnect() {
    connection.end((err) => {
        if(err) throw err;
        else console.log("Database disconnected");
    })
}

module.exports = {

    //GET
    getTask: (id) => {
        return new Promise((resolve, reject) => {
            let db = getConnection();
            let data = [id];
            db.query('SELECT * FROM tasks WHERE id=?', data,
            (err, results) => {
                if(results === undefined || results.length === 0) {
                    reject(new Error(err));
                } else {
                    resolve(results);
                  
                }
            });
            disconnect();
        
        });
    },

    getTasks: () => {
        return new Promise((resolve, reject) => {
            let db = getConnection();
            db.query('SELECT * FROM tasks', 
            (err, results) => {
                if(results === undefined) {
                    reject(new Error(err))
                } else {
                    console.log(results);

                    resolve(results);
                }
            })
            disconnect();
        })
    },

    //POST
    addTask: (task) => {
        return new Promise((resolve, reject) => {
            let db = getConnection();
            let data = [task.title, task.beginDate, task.endDate, task.status, JSON.stringify(task.tags)];
            console.log(data);
            db.query('INSERT INTO tasks (title, beginDate, endDate, status, tags) VALUES (?, ?, ?, ?, ?)', data, 
            (err, results) => {
                if(results.affectedRows !== 0) {
                    resolve(results.insertId);
                } else {
                    reject(new Error(err));
                }
            });
            disconnect();
        });
    },

    //PUT
    updateTask: (id, task) => {
        
        return new Promise((resolve, reject)=>{

            let db = getConnection();
            let data = [task.title, task.beginDate, task.endDate, task.status, JSON.stringify(task.tags), id];
            db.query('UPDATE tasks SET title=?, beginDate=?, endDate=?, status=?, tags=? WHERE id=?', data, 
            (err, results) => {
                console.log(results)
        
                if(results === undefined && results.affectedRows !== undefined) {
                    resolve();
                    connection.end((err) => {
                        if(err) throw err;
                        else console.log("Database disconnected");
                    })
                } else {
                    reject(new Error(err));
                }

                
            });
            disconnect();

            
        })
    },

    //DELETE
    deleteTask: (id) => {

        return new Promise((resolve, reject)=>{
            let db = getConnection();
            let data = [id];
            db.query('DELETE FROM tasks WHERE id=?',data, 
            (err, results) => {
                if(results.affectedRows !== 0) {
                    resolve();
                } else {
                    reject(new Error(err));
                }
            });
            disconnect();


        });
    },

    getTags: () => {

        return new Promise((resolve, reject) => {

            let db = getConnection();
            let data = [];
            db.query('SELECT * FROM tags', data,
            (err, results) => {
                if(results === undefined || results.length === 0) {
                    reject(new Error(err));
                } else {
                    resolve(results);
                }
            });
        });
            disconnect();
    },

    addTag: (name) => {

        return new Promise((resolve, reject)=>{
            let db = getConnection();
            let data = [name];
            db.query('INSERT INTO tags VALUES (?)', data, 
            (err, results) => {
                if(results.affectedRows !== 0) {
                    resolve();
                } else {
                    reject(new Error(err));
                }
            });
            disconnect();
        });

    }

}

