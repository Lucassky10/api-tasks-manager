function getConnection() {
    let mysql = require('mysql')
    let connection = mysql.createConnection({
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
                    resolve(results);
                }
            })
        })
    },

    //POST
    addTask: (task) => {
        return new Promise((resolve, reject) => {
            let db = getConnection();
            let data = [task.title, task.beginDate, task.endDate, task.status, JSON.stringify(task.tags)];
            db.query('INSERT INTO tasks (title, beginDate, endDate, status, tags) VALUES (?, ?, ?, ?, ?)', data, 
            (err, results) => {
                if(results.affectedRows !== 0) {
                    resolve(results.insertId);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },

    //PUT
    updateTask: (id, task) => {
        
        return new Promise((resolve, reject)=>{

            let db = getConnection();
            let data = [task.title, task.beginDate, task.endDate, task.status, JSON.stringify(task.tags), id];
            db.query('UPDATE tasks SET title=?, beginDate=?, endDate=?, status=?, tags=? WHERE id=?', data, 
            (err, results) => {
                if(results.affectedRows !== 0) {
                    resolve();
                } else {
                    reject(new Error(err));
                }
            });
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

        });
    }

}

