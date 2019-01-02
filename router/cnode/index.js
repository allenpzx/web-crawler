const express = require('express');
const router = express.Router();
const request = require('superagent');
const cheerio = require('cheerio');
const url = require('url');
const async = require("async");
const nodeUrl = 'http://cnodejs.org';

 const getPosts = (req, res, next) => async (page=1) => {
    try {

        const row_data = await request.get(`https://cnodejs.org/?tab=all&page=${page}`);
        const $ = cheerio.load(row_data.text);
        let post_list = [];
        $('#topic_list .topic_title').each(function (idx, element) {
            const ele = $(element);
            post_list.push({
                title: ele.attr('title'),
                href: url.resolve(nodeUrl, ele.attr('href'))
            });
        });

        let final = [];
        await new Promise((resolve, reject)=>{
            async.mapLimit(
                post_list,
                10,
                async (item, callback) => {
                        const detail = await request(item.href);
                        return detail
                },
                (err, results) => {
                    if (err) {
                        res.send(err);
                    }
                    results.map((v, index) => {
                        const $$ = cheerio.load(v.text, {
                            normalizeWhitespace: true
                        });
                        const author = $$('#content .changes span').eq(1).find('a').text();
                        const common1 = $$('#content .panel').eq(1).find('.cell').eq(0).find('.reply_content p').text();
                        const obj = {
                            ...post_list[index],
                            author,
                            common1
                        }
                        final.push(obj);
                    });
                    resolve()
                }
            );
        })
        return final
    } catch (error) {
        throw new Error(error)
    }
}

router.get('/', async function (req, res, next) {
    const query = url.parse(req.url, true).query;
    const postData = await getPosts(req,res,next)(query.page);
    res.render('cnode/index.pug', {data: postData});
})

module.exports = router;