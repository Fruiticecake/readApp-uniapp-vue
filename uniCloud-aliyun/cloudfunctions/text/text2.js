
const cheerio = require('cheerio');
const fs = require('fs');
const axios = require('axios');

// target
let url = 'http://www.52kshu.info';
// savePath
let photoSavePath = './img';

// run(url)
//     .catch(err => {
//     console.log('运行错误 => ' + err);
// });
async function text(url){
    let Html = await getHTML(url)
    let $ = cheerio.load(Html)
    console.log($.html())   
}
text(url)
async function run(url){
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
    console.log(bookobj)
    if(!fs.existsSync(`./novel/${bookobj.bookname}`)){
        try {
            fs.mkdir(`./novel/${bookobj.bookname}`)
            console.log(`./novel/${bookobj.bookname}目录创建成功`);           
        } catch (error) {
            console.log(error)
        }
    }else{
        console.log('目录已存在')
    }
    $('#all-chapter .col-md-6 a').each(function(index){
        //console.log($(this).prop('href'))
        let strurl = 'http://www.dubuxiaoshuo.com'
        strurl = strurl+$(this).prop('href');
        getNovel(strurl,index,bookobj)
    })
}
function getHTML(url){
    return new Promise((res,rej)=>{
        axios({
            method:'get',
            url :url
        })
        .then(function (response){
            res(response.data)
        })
        .catch(function (error){
            console.log(error)
        })
    })
}
async function getNovel(url,index,bookobj){
    return new Promise(async ()=>{
        try {
            let secondurl,nexturl,initurl;
            let strtext,strtitle;
            let res= await axios.get(url)
            .catch(function (error){
                console.log(error)
            })
            let $ = cheerio.load(res.data);
            strtitle = $('.cont-title').text()
            strtext = strtitle +'\n\r';
            $('#cont-body p').each((index,el)=>{
                strtext +=$(el).text()+'\r'
            })
            initurl = 'http://www.dubuxiaoshuo.com'
            secondurl = initurl +$('.col-md-6 a').eq(-1).prop('href');
            nexturl = initurl
            strtext =await getNextNovel(secondurl,strtext).catch((err)=>{console.log(err)})
            //console.log(strtext)
            const pageobj = {
                id:index,
                strtitle:strtitle,
                content:strtext
            }
            bookobj.contents.push(pageobj)
            fs.writeFileSync(`./novel/${bookobj.bookname}/${pageobj.strtitle}.txt`,strtext);
            
            console.log(`${bookobj.bookname} ${pageobj.strtitle}下载完成`);             
        } catch (error) {
            console.log(error)
        }
        let bookjson = JSON.stringify(bookobj)
        fs.writeFileSync(`./novel/${bookobj.bookname}/${bookobj.bookname}.json`,bookjson);
    })   
}
function getNextNovel(secondurl,strtext){
    let initurl = 'http://www.dubuxiaoshuo.com'
    let nexturl = ''
    let i = 0
    return new Promise(async (res,rej)=>{
        while(secondurl !== nexturl){
            if(i===0){
                nexturl = secondurl
                i++
            }
            if(nexturl.search(/_/)===-1){
                break;
            }
            try {
                let res = await axios.get(nexturl)
                let $ = cheerio.load(res.data)
                $('#cont-body p').each((index,el)=>{
                    strtext += $(el).text()+'\r'
                })
                //console.log(strtext)
                nexturl = initurl+$('.col-md-6 a').eq(-1).prop('href');
            } catch (error) {
                console.log(error)
            }
        }
        res(strtext)
        //console.log(strtext)
        
    })
}
/*         fs.open('./novel/'+strtitle+'.txt','w',function(err,fd){
            if(err){
                return console.error(err)
            }
        })
        fs.writeFile(fd,strtext,function(err){
            if(err){
                return console.error(err);
            }
            console.log(strtitle+'下载完成')
        })
        fs.close(fd) */
        
    
