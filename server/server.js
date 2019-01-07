const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const path = require('path');
const authRouter = require(path.resolve(__dirname, '../routes/auth/index.js'));
const cnodeRouter = require(path.resolve(__dirname, '../routes/cnode/index.js'));
const dataDrivenRouter = require(path.resolve(__dirname, '../routes/data-driven/index.js'));
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app
.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json())
.use(cookieParser())
.use(express.static(path.join(__dirname, '../public')))
.set('views', path.join(__dirname, '../views'))
.set('view engine', 'pug')
.set('view engine', 'ejs')
.use(authRouter)
.use('/cnode', cnodeRouter)
.use('/data', dataDrivenRouter)
.listen(PORT, (error) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Server listening on PORT ${PORT}!`);
});