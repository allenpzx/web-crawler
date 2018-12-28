const express = require('express');
const app = express();
const port = 9090;
const request = require('superagent');
const cheerio = require('cheerio');
const url = require('url');
const async = require("async");
const nodeUrl = 'http://cnodejs.org';

app.get('/topics', (req, res) => {
    request
        .get('https://cnodejs.org/api/v1/topics')
        .then(response => {
            let topics = [];
            const data = response.body.data;
            data.map(v => {
                const items = [];
                const $ = cheerio.load(v.content);
                $('a').each(function (idx, element) {
                    const ele = $(element)
                    console.log(ele);
                    ele.attr('href').includes('https://cnodejs.org') ?
                        items.push(ele.attr('href')) :
                        null
                })

                topics.push({
                    title: v.title,
                    author: v.author.loginname,
                    visit_count: v.visit_count,
                    reply_count: v.reply_count
                })
            })
            res.send(topics)
        })
        .catch(err => {
            console.log('error: ', err)
            res.send(err, err.message, err.response)
        })
})

app.get('/posts', (req, res) => {
    request
        .get('https://cnodejs.org')
        .then(response => {
            const $ = cheerio.load(response.text);
            let items = [];
            const baseUrl = 'http://cnodejs.org';
            $('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: baseUrl + $element.attr('href')
                });
            });
            res.send(items)
        })
        .catch(err => {
            console.log('error: ', err)
            res.send(err, err.message, err.response)
        })
})

app.get('/', async function (req, res){
        try{

            // get post's title and link
            const index_page = await request.get('https://cnodejs.org');
            const $ = cheerio.load(index_page.text);
            let post_list = [];
            $('#topic_list .topic_title').each(function (idx, element) {
                const ele = $(element);
                post_list.push({
                    title: ele.attr('title'),
                    href: url.resolve(nodeUrl, ele.attr('href'))
                });
            });

            let concurrent = 0;
            let post_detail = [];

            async.mapLimit(post_list, 5, function(item, callback){
                concurrent++
                console.log('concurrent: ', concurrent);
                request
                .get(item.href)
                .then(pd=>{
                    concurrent--;
                    post_detail.push(pd);
                });
            }, function(err, results){
                if(err) throw err;
                console.log('is results: ', results)
            });

            res.send(post_detail);


            // const post_detail = function* (){
            //     for(let i=0; i<post_list.length; i++){
            //       yield* post_list[i]
            //     }
            // };


            // post_list.forEach(function (v){
            //     promises.push(request(v.href));
            // });
            //
            // let post_info_list = await Promise.all(promises);
            // let final = [];
            // post_info_list.map((v, i)=>{
            //   const $$ = cheerio.load(v.text, {
            //     normalizeWhitespace: true,
            //     xmlMode: true
            //   });
            //
            //   const isTop = $$('.topic_full_title').find('.put_top');
            //   let title1
            //   if(isTop){
            //     title1 = $$('.topic_full_title').contents().eq(2).text();
            //   }else{
            //     title1 = $$('.topic_full_title').text();
            //   }
            //   const author = $$('#content div.changes span').eq(1).find('a').text();
            //   const common1 = $$('.reply_content').eq(0).text().trim();
            //
            //   final.push({
            //     ...post_list[i], author, common1
            //   });
            //
            // });
            //
            // res.send(final);

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