/**
 * 抓取phantomjs 复用客户端
 */
const genericPool = require("generic-pool");
const phantom = require('phantom');

const propertyUseTime = "__useTime";
const maxTime = 15;
let clientInstanceMap = {};
const factory = {
    create: async function() {
        const  instance = await phantom.create(['--ignore-ssl-errors=yes', '--load-images=no']);
        instance[propertyUseTime] = 0;
        let page = await instance.createPage();
        clientInstanceMap[page] = instance;
        return page;
    },
    destroy: async function(client) {
        await clientInstanceMap[client].exit();
    },
    validate: client => {
        return clientInstanceMap[client][propertyUseTime] < maxTime;
    }
};

const opts = {
    max: 10, // maximum size of the pool
    min: 0 // minimum size of the pool
};

const myPool = genericPool.createPool(factory, opts);


async function doGrab(grabFunction, param) {
    let data = null;
    const client = await myPool.acquire();
    data = await grabFunction(client, param);
    clientInstanceMap[client][propertyUseTime]++
    myPool.release(client);
    return data;
}

async function destroy() {
    await myPool.drain();
    await myPool.clear();

}

module.exports.destroy = destroy;
module.exports.doGrab = doGrab;