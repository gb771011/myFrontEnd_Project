const fs = require('fs');
// dnc to djw

// read file
function readfile(url) {
    console.log(`readfile(${url})`);
    return new Promise((rs, rj) => {
        fs.readFile(url, (err, data) => {
            if (err) { rj(err); }
            else { rs(data); }
        });
    });
}
function getCoord(data) {
    console.log('getCoord');
    return new Promise((rs, rj) => {
        let lines = data.toString().split('\r\n');
        let result = '';
        // console.log(lines[26]);
        // 讀取lines[26]以確認座標總數
        // 擷取座標值部分
        lines.slice(27, 27 + parseInt(lines[26])).forEach((val) => {
            let temp = val.split(',').slice(0, 3);
            // 動作
            switch (parseInt(temp[0])) {
                case 0:
                    temp[0] = '快速移動';
                    break;
                case 1:
                    temp[0] = '直線補間';
                    break;
                case 3:
                    temp[0] = '弧';
                    break;
                case 4:
                    temp[0] = '弧終點';
                    break;
                default:
                    break;
            }
            // 座標:字串改數字
            temp[1] = parseFloat(parseFloat(temp[1]).toFixed(3));
            temp[2] = parseFloat(parseFloat(temp[2]).toFixed(3));
            // 將陣列轉換成字串
            result += `${temp.toString()},,,,,,,,,,\r\n`;
        });

        rs(result);
    });
}
function assemble(coord) {
    // 加上頭尾
    console.log('assemble');
    return new Promise((rs, rj) => {
        fs.readFile('./src/dnc_bottom.txt', (err, data) => {
            if (err) { rj(err); }
            else {
                let result = data.toString().replace('{code}', coord);
                rs(result);
            }
        });
    });
}
function writefile(output, cxt) {
    return new Promise((rs, rj) => {
        fs.writeFile(output, cxt, (err) => {
            if (err) { rj(err); }
            else { rs(`finish: ${output}`); }
        });
    });
}
/* 
step:
1. 讀取輸入檔案
2. 轉亂路徑部分
3. 讀取格式檔
4. 組合，輸出
*/

readfile('./src/test.djw')
    .then((data) => {
        console.log('2.');
        return getCoord(data);
    })
    .then((data) => {
        console.log('3.');
        return assemble(data);
    })
    .then((data) => {
        console.log('4.');
        return writefile('./output.dnc', data);
    })
    .catch((err) => {
        console.log(err);
    });