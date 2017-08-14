var tpNode, tpText, container;
var input=0, firstDay, lastDate, weekCount, dateArr = [], thisMonth = {};
var myCalendar = document.getElementById("myCalendar");
var date = new Date();
var weekTitle = ['Sun', 'Mon', 'Tus', 'Wes', 'Thu', 'Fri', 'Sat'];

// function:初始化表格
function calendarInit(iParent, iTitle) {
    // 新增<table>至#myCalendar裡
    tpNode = document.createElement("table");
    iParent.appendChild(tpNode);
    container = iParent.childNodes[0];

    // 將本月月份加到表格標題列
    tpNode = document.createElement("caption");
    tpText = document.createTextNode(iTitle);

    tpNode.appendChild(tpText);
    container.appendChild(tpNode);
}


function arrayToRow(iParent, iTag, iData) {
    // 在iParent後面插入新列
    tpNode = document.createElement("tr");
    iParent.appendChild(tpNode);
    // 加入第一格資料
    tpNode = document.createElement(iTag);
    tpText = document.createTextNode(iData[0]);
    tpNode.appendChild(tpText);
    container.lastChild.appendChild(tpNode);
    // 複製
    for (var i = 1; i < iData.length; i++) {
        tpNode = container.lastChild.lastChild.cloneNode(false);
        tpText = document.createTextNode(iData[i]);
        tpNode.appendChild(tpText);
        container.lastChild.appendChild(tpNode);
    }
}
 
// 取得本月月份.2
input += date.getMonth();
date.setMonth(input);
thisMonth = date.toDateString().split(" ")[1];

// 取得本月第一日為星期幾
date.setDate(1);
firstDay = date.getDay();
console.log("firstDay:", firstDay);

// 取得本月天數
date.setMonth(1 + date.getMonth(), 0);
lastDate = parseInt(date.toDateString().split(" ")[2]);
console.log("lastDate:", lastDate);

// 取得本月週數
weekCount = parseInt((firstDay + lastDate) / 6);
console.log("weekCount:", weekCount);

// 建立天數的雙層陣列
for (var j = 0; j < weekCount; j++) {
    var temp = [];
    for (var i = 0; i < 7; i++) {
        temp[i] = (7 * j) + i + 1 - firstDay;
        if (temp[i] < 1 || temp[i] > lastDate) {
            temp[i] = " ";
        }
    }
    dateArr[j] = temp;
}

console.log("dateArr:");
for (var i in dateArr) {
    console.log(dateArr[i]);
}

// 建立表格&插入標題
calendarInit(myCalendar, thisMonth);

// 建立第一列(星期抬頭)
arrayToRow(container, "th", weekTitle);

for (var i in dateArr) {
    arrayToRow(container, "td", dateArr[i]);
}
