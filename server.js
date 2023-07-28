const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

require('dotenv').config()

const app = express()

const port = process.env.PORT || '3000'

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')


const pool = mysql.createPool({
    connectionLimit: 100,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
})

//connect to db
pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('Connected to the database')
})


const routes = require('./server/routes/product')
app.use('/',routes);

app.listen(port,()=>{
    console.log('app is working')
})