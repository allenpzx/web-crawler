const express = require('express');
const app = express();
const port = process.env.PORT || 9090;
const path = require('path');
// const request = require('superagent');
// const cheerio = require('cheerio');
// const url = require('url');
// const async = require("async");
// const nodeUrl = 'http://cnodejs.org';

    app
    .use(express.static(path.join(__dirname, 'public')))
    .get('/', function (req, res) {
        // try {

            // get post's title and link
            // const index_page = await request.get('https://cnodejs.org');
            // const $ = cheerio.load(index_page.text);
            // let post_list = [];
            // $('#topic_list .topic_title').each(function (idx, element) {
            //     const ele = $(element);
            //     post_list.push({
            //         title: ele.attr('title'),
            //         href: url.resolve(nodeUrl, ele.attr('href'))
            //     });
            // });

            // let post_detail = [];

            // async.mapLimit(post_list, 5, function(item, callback){
            //     return request
            //     .get(item.href)
            //     .then(pd=>pd);

            // }, function(err, results){
            //     if(err) throw err;
            //     console.log('is results: ', results)
            // });

            // res.send(post_detail);

            res.send('ceshi');

        // } catch (error) {
            // throw error
        // }
    })

app.listen(port, (error) => {
    if (error) {
        return console.log('something was wrong: ', error);
    }
    console.log(`Example app listening on port ${port}!`);
});