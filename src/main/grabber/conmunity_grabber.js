/**
 * 抓取各区域小区
 */

const doGrab = require("../common/page_pool").doGrab;
const filter = require("./filter/grab_filter");
const parser = require("./pageparser/conmunity_parser")
const cheerio = require('cheerio');
const dataOperater = require("../data_files/data_operator");

const urlPrefix = "https://cd.lianjia.com/ershoufang/";


async function grabHouse(page, param) {
    await filter(page);
    let firstPage = param.page === 1;
    if (firstPage) {
        const status = await page.open(urlPrefix + "c" + param.conmunityId);
    }else{
        const status = await page.open(urlPrefix + "pg" + param.page + "c" + param.conmunityId);
    }
    const content = await page.property('content');
    if (firstPage) {
        return analyze(content, true);
    }else{
        return analyze(content);
    }
}
function analyze(html, needPage){
    const $ = cheerio.load(html);
    if (needPage) {
        return {maxPage: parser.getMaxPage($), houseList: parser.getHouseInfo($)}
    }
    return {houseList: parser.getHouseInfo($)};
}

async function grabCommunityHouse(conmunityName, conmunityId, conmunityCommonPrice) {
    let data = await doGrab(grabHouse, {conmunityId:conmunityId, conmunityName:conmunityName , page: 1});
    let houseList = data.houseList;
    let promises = []
    if(data.maxPage===1){
        console.log("conmunity " + conmunityName + " : 全部爬取完毕");
        return houseList;
    }
    for(let i = 2; i <= data.maxPage; i++){
        promises.push(doGrab(grabHouse, {conmunityId: conmunityId, conmunityName: conmunityName , page: i}));
    }
    let result = await Promise.all(promises);
    for(let i in result){
        houseList = houseList.concat(result[i].houseList);
    }
    console.log("conmunity " + conmunityName + " : 全部爬取完毕");
    dataOperater.dataWriter("/house_info/" + conmunityName + ".json", JSON.stringify(houseList));
    return houseList;
}

module.exports.grabCommunityHouse = grabCommunityHouse;