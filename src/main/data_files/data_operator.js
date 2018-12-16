/**
 * 读取配置文件
 */
const fs = require("fs");

let files = fs.readdirSync(__dirname);

for(let i in files){
    if (__filename.replace(/.*\//g,"") == files[i].toString()) {
        continue;
    }else if (fs.statSync(__dirname + "/" + files[i]).isDirectory()) {
        continue;
    }
    let fileName = files[i].replace(".json","");
    module.exports[fileName] = JSON.parse(fs.readFileSync(__dirname + "/" + files[i]).toString());
}

function dataWriter(path, dataStr) {
    fs.writeFileSync(__dirname + path, dataStr);
}

module.exports.dataWriter = dataWriter