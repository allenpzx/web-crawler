const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next){
    if(req.url === '/'){
        return res.render('index/index.pug', {title: 'crawler test'});
    }
    next();
});

module.exports = router;