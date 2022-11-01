
const cheerio = require('cheerio');
const fs = require('fs');
const axios = require('axios');
const iconv = require('iconv-lite');

let url = 'http://www.1x49.com/72118/'
// run(url).catch(err => {
//     console.log('运行错误 => ' + err);
// });
let bookobj = {
    bookname:'text'
}
if(!fs.existsSync(`./novel/${bookobj.bookname}`)){
    try {
        fs.mkdirSync(`./novel/${bookobj.bookname}`)
        console.log(`./novel/${bookobj.bookname}目录创建成功`);           
    } catch (error) {
        console.log(error)
    }
}else{
    console.log('目录已存在')
}
async function run (url){
    console.log(1)
    try {
        const bookname = 'textbook2'
        if(!fs.existsSync(`./novel/${bookname}`)){
            fs.mkdir(`./novel/${bookname}`,function(){})
            console.log(`./novel/${bookname}目录创建成功`);           
        }else{
            console.log('目录已存在')
        }      
        let html = await getHTML(url)
        let $ = cheerio.load(html)
        let strtext = '\n\r'
        $('.chapterlist dd a').each(function (index){
            let strurl = 'http://www.1x49.com'
            strurl = strurl+$(this).prop('href');
            console.log(strurl)
            strtext += getNovel(strurl,index,bookname)            
        })
        fs.writeFileSync(`./novel/${bookname}/${bookname}.txt`,strtext);
    } catch (error) {
        console.log(error)
    }
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
function getNovel(url,index,bookname){
    async ()=>{
        try {
            let secondurl,nexturl,initurl;
            let strtitle,strtext;
            let res= await axios.get(url)
            .catch(function (error){
                console.log(error)
            })
            let $ = cheerio.load(res.data);
            strtitle = $('.inner h1').text()
            strtext = strtitle +'\n\r';
            $('#BookText p').each((index,el)=>{
                strtext +=$(el).text()+'\r'
            })
            //fs.writeFileSync(`./novel/${bookname}/${strtitle}.txt`,strtext);
            console.log(`${bookname} ${strtitle}下载完成`);     
            return strtext
                    
        } catch (error) {
            console.log(error)
        }
    }
}
function getNextNovel(secondurl,strtext){
    let initurl = 'http://www.1x49.com'
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
                $('.chapter p').each((index,el)=>{
                    strtext += $(el).text()+'\r'
                })
                //console.log(strtext)
                nexturl = initurl+$('.chapter_go a').eq(1).prop('href');
            } catch (error) {
                console.log(error)
            }
        }
        res(strtext)
        //console.log(strtext)
        
    })
}