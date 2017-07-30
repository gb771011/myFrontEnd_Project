const fs = require("fs"),
    path = require("path"),
    process = require("process");

let count = 0,
    target = path.join(__dirname, "test");

/*
1. 讀取資料夾中的所有檔案
2. 檢查是否有副檔名的資料夾=>有的畫跳過，沒有的話建立
3. 將檔案一一放入資料夾中
*/

new Promise((resolve, reject) => {
    // 1.
    fs.readdir(target, (err, files) => {
        if (err) {
            reject([target, err]);
        } else {
            let filesExt = [];
            for (let i of files) {
                if (filesExt.indexOf(path.parse(i).ext) < 0) {
                    filesExt.push(path.parse(i).ext);
                }
            }
            resolve({ "target": target, "files": files, "filesExt": filesExt });
        }
    });
})
    .then((val) => {
        console.log(val);
        return new Promise((resolve, reject) => {
            let dirCheckResult = [];
            fs.exists(path.join);
        });
    }, (reason) => {
        console.log(`${reason[0]} no exist`);
    })
    ;