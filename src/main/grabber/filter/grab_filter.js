/**
 * 设置默认过滤, 不加载css, 图片, 以及插码文件
 */

const filter= {
    regGoogleAnalysis: /google-analytics/g,
    tingyun: /tingyun\.com/g,
    growingIo: /growingio\.com/g,
    cnzz: /w\.cnzz\.com/g,
    baidu: /baidu\.com/g,
    doubleclick: /doubleclick\.net/g,
    css: /[\s\S]+?(\.css)/g,
    img: /[\s\S]+?(\.png|\.jpg|\.gif\.jpeg)/g
}


async function setFilterProperty(page) {
    page.property("customHeaders",{
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
    })
    await page.on('onResourceRequested', true, function (requestData, networkRequest) {
        if (isFiltered(requestData.url)) {
            networkRequest.abort();
        }else{
            // console.log(requestData.url);
        }
    });

}

function isFiltered(url) {
    var filterd = false;
    for(var web in filter){
        var reg = filter[web];
        reg.lastIndex = 0;
        filterd |= reg.test(url)
    }
    return filterd;
}


module.exports = setFilterProperty;
