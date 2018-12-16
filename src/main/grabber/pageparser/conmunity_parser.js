
function getHouseInfo($) {
    let houseList = []
    $("ul.sellListContent li.LOGCLICKDATA").each((i, el) => {
        let temp = $(el).children("div.info");
        let houseId = temp.children("div.title").children("a").attr("data-housecode");
        let title = temp.children("div.title").children("a").text();
        let address = temp.children("div.address").children("div.houseInfo");
        let url = address.children("a").attr("href");
        let area = address.text().split("|")[2];
        let layOut = address.text().split("|")[1];
        let orientation = address.text().split("|")[3];
        let priceInfo = temp.children("div.priceInfo");
        let totalPrice = parseInt(priceInfo.children("div.totalPrice").children("span").text()) * 10000;
        let unitPrice = priceInfo.children("div.unitPrice").attr("data-price")

        houseList.push({
            houseId: houseId,
            title: title,
            url: url,
            area: area,
            layOut: layOut,
            orientation: orientation,
            totalPrice: totalPrice,
            unitPrice: unitPrice
        });

    })
    return houseList;
}

function getMaxPage($){
    return $("div.house-lst-page-box.page-box a").eq(-2).attr("data-page");
}

module.exports.getMaxPage = getMaxPage
module.exports.getHouseInfo = getHouseInfo