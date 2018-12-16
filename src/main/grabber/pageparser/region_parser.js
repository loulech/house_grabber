const buildYearReg = /(\s)(\d{4})([\u4e00-\u9fa5]{3})/gm;
const conmunityIdReg = /(xiaoqu\/)(\d+)(\/)/gm;
function getConmunityInfo($){
    function getBuildYear(html) {
        try{
            buildYearReg.lastIndex = 0;
            return buildYearReg.exec(html)[2];
        }catch (e) {
            return null;
        }
    }

    function getConmunityId(url) {
        try{
            conmunityIdReg.lastIndex = 0;
            return conmunityIdReg.exec(url)[2];
        }catch (e) {
            return null;
        }
    }

    let conmunityInfo = []
    $("ul.listContent li.xiaoquListItem").each((i, el)=> {
        var url = $(el).children("div.info").children("div.title").children("a").attr("href");
        var title = $(el).children("div.info").children("div.title").children("a").text();
        var bizCircle = $(el).children("div.info").children("div.positionInfo").children("a.bizcircle").text();
        var buildYear = getBuildYear($(el).children("div.info").children("div.positionInfo").text());
        var pricePerSquare = $(el).children("div.xiaoquListItemRight").children("div.xiaoquListItemPrice").children("div.totalPrice").children("span").html();
        var houseOnSale = $(el).children("div.xiaoquListItemRight").children("div.xiaoquListItemSellCount").children("a.totalSellCount").children("span").html();

        conmunityInfo.push({
            url: url,
            conmunityId: getConmunityId(url),
            title: title,
            bizCircle: bizCircle,
            buildYear: buildYear,
            pricePerSquare: pricePerSquare,
            houseOnSale: houseOnSale
        })
    })
    return conmunityInfo;
}

function getMaxPage($){
    return $("div.house-lst-page-box.page-box a").eq(-2).attr("data-page");
}
module.exports.getMaxPage = getMaxPage
module.exports.getConmunityInfo = getConmunityInfo