function settingCalender(i1) {
    console.log("settingCalender() activate");
    var date = new Date();
    var day = document.getElementById("day"),
        month = document.getElementById("month");
    var dateStr = [],
        targetMonth = 0,
        dayFirst = 0,
        dayCount = 0,
        calenderRow = 0,
        tempRow = "";
        
    //確認補正參數(未指定or參數=0時>>顯示當前月份)
    if (i1 === undefined || i1 === 0) {
        console.log("{No Input}");
    }
    else {
        date.setMonth(i1 + date.getMonth());
    }
    dateStr = date.toDateString().split(" ");
    console.log("dateStr:", dateStr);
    targetMonth = date.getMonth();
    console.log("targetMonth :", targetMonth);

    //取得指定月份的天數(從下個月逆推算)
    date.setMonth(1 + targetMonth, 0);
    dayCount = date.getDate();
    console.log("dayCount:", dayCount);

    //取得指定月份第一天為星期幾
    date.setMonth(targetMonth, 1);
    dayFirst = date.getDay();
    console.log("dayFirst:", dayFirst);

    //根據dayfirst決定顯示的行數
    if (dayFirst > 3) {
        calenderRow = 6;
    } else {
        calenderRow = 5;
    }
    console.log("calenderRow:",calenderRow) ;

    //將指定年分跟月份(英文)加到table的表頭
    month.innerText = dateStr[3] + "-" + dateStr[1];
    console.log("Year-Month(eng):", month.innerText);

    //將日期內容加到table裡面
    for (var j = 0; j < calenderRow; j++) {
        tempRow = "<tr>";
        for (var i = 0; i < 7; i++) {
            var val = (i + j * 7) - dayFirst + 1;
            if (val > dayCount || val < 1) {
                val = " ";
            }
            tempRow += "<td>" + val + "</td>";
        }
        tempRow += "</tr>";
        day.innerHTML += tempRow;
    }
    // Tip: element.cloneNode
}

window.onload = settingCalender(3);

/*
console.log("Use JS Date Method");
// JS Date Method使用方法:
// 1.建立一時間物件
var date=new Date();
// 2.對時間物件直接使用方法(.setDate)
date.setDate(31);
// 3.使用方法後再輸出即可，不用設變數(設變數會得到毫秒值)
console.log(date.toString());
console.log("/Use JS Date Method");
 */