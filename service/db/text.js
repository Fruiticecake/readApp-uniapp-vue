var fs = require('fs');
var file = 'test.db';//这里写的就是数据库文件的路径
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);
const cheerio = require('cheerio');
const fs = require('fs');
const axios = require('axios');

//file:test.js
// var sqlite3 = require('sqlite3');
// var db = new sqlite3.Database('/tmp/1.db',function() {
//   db.run("create table test(name varchar(15))",function(){
//     db.run("insert into test values('hello,world')",function(){
//       db.all("select * from test",function(err,res){
//         if(!err)
//           console.log(JSON.stringify(res));
//         else
//           console.log(err);
//       });
//     })
//   });
// });

console.log(exists)
//Create Table
var createBook = db.prepare('create table if not exists bainiangudu (bookname VARCHAR(20),author VARCHAR(20),contents CLOB);')
console.log(createBook.run());
//insert
var contents = '阿玛兰塔坐在柳条摇椅里，把刺绣活儿放在膝上，望着奥雷连诺.霍塞；他给脸颊和下巴都涂满了肥皂沫，就在皮带上磨剃刀，有生以来第一次剖脸了。他为了把浅色的茸毛修成一撮胡于，竟将一个小疹疱弄出了血，而且割破了上唇，然而一切完毕之后，他还是原来的样儿；复杂的刮脸手续使阿玛兰塔觉得，正是从这时起，奥雷连诺·霍塞长大成人了。'
var content = '123'
var insertBookContent = db.prepare(`insert into bainiangudu values('bainiangudu','zuozhe',${content})`)
insertBookContent.run();
//查
//查一个表的所有数据
db.all("select * from bainiangudu",function(err,row){
    console.log(JSON.stringify(row));
})
//查一条数据
db.each("select * from bainiangudu",function(err,row){
     console.log(row);
})


async function downBookList(url){
    let Html = await getHTML(url)
    let $ = cheerio.load(Html)
    //console.log(Html)
    //console.log($.html())
    //console.log($('#all-chapter .col-md-6').html())
    //      /book/p1234/
    const bookobj = {
        id:$('.book-name a').prop('href').match(/(?<=\/book\/p).*?(?=\/)/)[0],
        bookname:$('.book-name a').text(),
        author:$('.media-body .row .col-md-8').eq(0).text(),
        status:$('.media-body .row .col-md-4').text(),
        recently:$('.media-body .row .col-md-8').eq(-1).text(),
        contents:[]
    }
    $('#all-chapter .col-md-6 a').each(async function(index){
        //console.log($(this).prop('href'))
        let strurl = 'http://www.dubuxiaoshuo.com'
        strurl = strurl+$(this).prop('href');
        
        await getNovel(strurl,index,bookobj)
    })
}