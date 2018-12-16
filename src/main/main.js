/**
 * 脚本运行主文件
 */
var regionGrabber = require("./grabber/region_grabber").grabRegionCommunity
var conmunityGrabber = require("./grabber/conmunity_grabber").grabCommunityHouse
var grabberData = require("./data_files/data_operator");
var pool = require("./common/page_pool");




async function getRegionConmunity(url, regionName) {
    let conmunitys = await regionGrabber(url, regionName);
    let promises = conmunitys.map(conmunity=>conmunityGrabber(conmunity.title, conmunity.conmunityId, conmunity.pricePerSquare))
    await Promise.all(promises);
}


(async function () {
    console.time('抓取链家高新区,天府新区所有小区所有房')
    let region = grabberData.region[6];//天府新区
    let region2 = grabberData.region[3];//高新区
    await Promise.all([getRegionConmunity(region.href, region.name), getRegionConmunity(region2.href, region2.name)]);
    await pool.destroy();
    console.timeEnd('抓取链家高新区,天府新区所有小区所有房')
})();
