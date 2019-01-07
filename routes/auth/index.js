const express = require('express');
const router = express.Router();

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'moremore'
// });
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('connected as id ' + connection.threadId);

// });

router.get('/*', function (req, res, next){
    const cookies = req.cookies;
    if(!cookies){
        res.render('auth/login.ejs')
    }
    if(req.url === '/'){
        return res.render('index/index.pug', {title: 'crawler test'});
    }
    next();
});

router.get('/login', function (req, res, next){
    if(req.cookies){
        res.render('index')
    }
    res.render('auth/login')
});
router.get('/register', function (req, res, next){
    if(req.cookies){
        res.render('index')
    }
    res.render('auth/register')
});

router.post('/login', function (req, res, next){
    console.log(req.body)
});
router.post('/register', function (req, res, next){
    console.log(req.body)
});

module.exports = router;