const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const path = require('path');
const indexRouter = require(path.resolve(__dirname, '../router/index.js'));
const cnodeRouter = require(path.resolve(__dirname, '../router/cnode/index.js'));
const dataDrivenRouter = require(path.resolve(__dirname, '../router/data-driven/index.js'));

const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'moremore'
});
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);

});

app
.use(express.static(path.join(__dirname, '../public')))
.set('views', path.join(__dirname, '../views'))
.set('view engine', 'pug')
.set('view engine', 'ejs')
.use(indexRouter)
.use('/cnode', cnodeRouter)
.use('/data', dataDrivenRouter)
.listen(PORT, (error) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Server listening on PORT ${PORT}!`);
});