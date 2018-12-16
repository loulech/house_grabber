/**
 * 抓取各区域小区
 */

const doGrab = require("../common/page_pool").doGrab;
const filter = require("./filter/grab_filter");
const parser = require("./pageparser/region_parser")
const cheerio = require('cheerio');


async function grabCommunity(page, param) {
    await filter(page);
    let firstPage = param.page === 1;
    if (firstPage) {
        const status = await page.open(param.regionUrl);
    }else{
        const status = await page.open(param.regionUrl + "pg" + param.page);
    }
    const content = await page.property('content');
    console.log("region " + param.regionName + " : 第" + param.page + "页爬取完毕");
    if(firstPage){
        return analyze(content, true);
    }else{
        return analyze(content);
    }
}

function analyze(html, needPage){
    const $ = cheerio.load(html);
    if (needPage) {
        return {maxPage: parser.getMaxPage($), conmunityList: parser.getConmunityInfo($)}
    }
    return {conmunityList: parser.getConmunityInfo($)};
}

async function grabRegionCommunity(regionUrl, regionName) {
    let data = await doGrab(grabCommunity, {regionUrl:regionUrl, regionName:regionName , page: 1});
    let conmunityList = data.conmunityList;
    let promises = []
    for(let i = 2; i <= data.maxPage; i++){
        promises.push(doGrab(grabCommunity, {regionUrl: regionUrl, regionName: regionName , page: i}));
    }
    let result = await Promise.all(promises);
    for(let i in result){
        conmunityList = conmunityList.concat(result[i].conmunityList);
    }
    console.log("region " + regionName + " : 全部爬取完毕");
    return conmunityList;
}

module.exports.grabRegionCommunity = grabRegionCommunity;