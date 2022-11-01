const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');

// http://www.feizdy.com 是一个电影网站
// 尝试的时候建议选用http的网站，初学者比较好爬
// 我们的目的是爬取电影的名称和图片信息，并把图片下载保存起来

// target
let url = 'http://www.feizdy.com';
// savePath
let photoSavePath = './img';

run(url, photoSavePath)
    .catch(err => {
    console.log('运行错误 => ' + err);
});

async function run(url, photoSavePath) {
    //  获得首页
    const html = await getHTML(url);

    // 可以直接用正则进行内容匹配
    // 把首页 用cheerio模块转换成Dom操作 （注意：load转换时可能会乱码，所以要设置{decodeEntities: false}）
    const $ = cheerio.load(html, {decodeEntities: false});
    // 2.对返回来的数据进行处理

    // 用元素审查分析html文件结构（见图 1）
    // 元素选择器获得所需要的结构的集合

    // 这里是获得电影详情页的链接
    $('.container .row .col-sm-6 .movie-item a').each((i, item) => {
        // 这里的item要转换一下，用$(item)变成dom节点
        // 由图可以看出链接是片段的，要拼接成完整的url
        let detailUrl = url + $(item).attr('href');

        // 利用详情链接获取电影详细信息
        getDetailMessage(detailUrl)
            .then(movie => {
                return addToFile(movie);
            })
            .then(imgSrc => {
                downloadPhoto(imgSrc, photoSavePath, i);
            })
            .catch(err => {
                console.log(err);
            });
    });
}

// 请求资源
function getHTML(url, timeout = 20000) {
    return new Promise((resolve, reject) => {
        // 1.发送请求，等待网站回应
        request.get(url, {timeout: timeout}, function (error, response, body) {
            error ? reject('Timeout.\n' ) : resolve(body);
        })
    })
}

// 获得电影相关的信息
async function getDetailMessage(url) {
    try {
        let detailHTML = await getHTML(url);
        // 结构分析在图 2
        const $ = cheerio.load(detailHTML, {decodeEntities: false});
        let movie =  {
                name: await $('.container .container-fluid .row .col-md-12 .movie-title').text(),
                img:  await $('.container .container-fluid .row .col-md-9 .row .col-md-4 a img').attr('src')
            };
        // 去除空电影
        return movie.name && movie.img ? movie : undefined;
    } catch (e) {
        console.log('Method: getDetailMessage =>' + e);
    }
}

// 添加到文件
function addToFile(item) {
    if (item) {
        let imgSrc = item.img;
        item = JSON.stringify(item) + '\n';
        // 把movie 写入文件
        fs.appendFile('./data/data.txt', item, {encoding: 'utf-8', flag: 'a'}, error => {
            error ? console.log('Method: addToFile => data write error.\n' + error) : null;
        })
        return imgSrc;
    }
}


// 下载图片
function downloadPhoto(src, photoSavePath, filename, timeout = 20000) {
    if (src) {
        // 提取后缀名
        let suffix = src.toString().slice(-4);
        // 拼接路径
        let path = photoSavePath + '/' + filename + suffix;
        // 下载
        request.get(src, {timeout: timeout}, err => {
            err ? console.log('Method: downloadPhoto => download error\n' + err) : null;
        }).pipe(fs.createWriteStream(path));
    }
}
