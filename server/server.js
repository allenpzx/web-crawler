const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const path = require('path');
const indexRouter = require(path.resolve(__dirname, '../router/index.js'));
const cnodeRouter = require(path.resolve(__dirname, '../router/cnode/index.js'));

    app
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, '../views'))
    .set('view engine', 'pug')
    .use(indexRouter)
    .use('/cnode', cnodeRouter)
    .listen(PORT, (error) => {
        if (error) {
            throw new Error(error);
        }
        console.log(`Server listening on PORT ${PORT}!`);
    });