const express = require('express');
const app = express();
const port = process.env.PORT || 9090;
const path = require('path');
const request = require('superagent');
const cheerio = require('cheerio');
const url = require('url');
const async = require("async");
const nodeUrl = 'http://cnodejs.org';

    app
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, '../views'))
    .set('view engine', 'ejs')
    .get('/', async function (req, res) {
        try{
            const row_data = await request.get('https://cnodejs.org');
            const $ = cheerio.load(row_data.text);
            let post_list = [];
            $('#topic_list .topic_title').each(function (idx, element) {
                const ele = $(element);
                post_list.push({
                    title: ele.attr('title'),
                    href: url.resolve(nodeUrl, ele.attr('href'))
                });
            });

            async.mapLimit(
                post_list,
                10, 
                async (item, callback)=>{
                    const detail = await request(item.href);
                    return detail
                },
                (err, results)=>{
                    if(err){
                        res.send(err);
                    }

                    let final = [];
                    results.map((v, index)=>{
                        const $$ = cheerio.load(v.text,{ normalizeWhitespace: true});
                        const author = $$('#content .changes span').eq(1).find('a').text();
                        const common1 = $$('#content .panel').eq(1).find('.cell').eq(0).find('.reply_content p').text();
                        const obj = {
                            ...post_list[index],
                            author,
                            common1
                        }
                        final.push(obj);
                    })

                    res.render('home/home.ejs', {index_detail: final});

                }
            );

        }catch(error){
            throw error
        }

    })

app.listen(port, (error) => {
    if (error) {
        return console.log('something was wrong: ', error);
    }
    console.log(`Example app listening on port ${port}!`);
});