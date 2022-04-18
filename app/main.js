const http = require("http")
const express = require('express')
const mysql = require('mysql');
const { getFirstName } = require("moxname");

const port = 3000
const app = express();

const config = {
    host: 'mysql_db',
    user: 'root',
    password: 'root',
    database: 'node_db'
}

app.get('/', async (req, res) => {
    const conn = mysql.createConnection(config)
    
    insertRandomName(conn)

    let names = await getAllNames(conn)
    
    conn.end()

    let body = "<h1>Full Cycle Rocks!</h1><br/>"
    names.forEach(item => {
        body += `-${item["name"]}<br/>`
    })

    res.end(body)
});

function insertRandomName(conn){
    let name = getRandomName()
    const insert = `INSERT INTO people(name) VALUES ('${name}')`
    conn.query(insert)
}

function getRandomName(){
    let genders = ['male', 'female']
    let randomGenderIndex = Math.floor(Math.random() * 2)
    let randomGender = genders[randomGenderIndex]

    return getFirstName(randomGender, 1)
}

function getAllNames(conn){
    return new Promise(function (res, rej) {
        conn.query("SELECT name FROM people", function (error, result) {
            if (error)
                rej(error)
            else
                res(result)
        })
    })
}
  
app.listen(port);