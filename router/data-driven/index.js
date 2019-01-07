const express = require('express');
const router = express.Router();

router.get('/', async function (req, res, next) {
    res.render('data-driven/index.pug');
})
router.get('/svg', async function (req, res, next) {
    res.render('data-driven/svg.ejs');
})

module.exports = router;