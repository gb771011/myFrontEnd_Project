var ans = document.getElementById("ans"),
    keyCleanError = document.getElementById("cleanError"),
    keyClean = document.getElementById("clean"),
    keyBackSpace = document.getElementById("backSpace"),
    keyCalculate = document.getElementById("calculate"),
    keyEqual = document.getElementById("equal");
var keyNum = document.getElementsByClassName("num"),
    keyCalculate = document.getElementsByClassName("calculate");

var i, key, last, temp = {}, isEqual = false, input = "", output = 0, c1, c2;
var doReset = true;

var ansNum, ansClean, ansBackSpace, ansCalculate;

ansNum = function () {
    input = this.innerText;

    /*
    #ans取代/添加分析
    1.首位為"0"，輸入為"1~9":顯示值為"1~9"
    2.首位為"0"，輸入為".":顯示為"0."
    3.已完成計算，輸入為"1~9":顯示值為"1~9"
    4.已完成計算，輸入為".":顯示為"0."
    */
    if (doReset) {
        if (input === ".") {
            ans.innerText = "0.";
        } else {
            ans.innerText = input;
        }
        doReset = false;
    } else {
        ans.innerText += input;
    }
    console.log("numKey(" + input + ") onclick");
    console.log(temp);
};
for (i = 0; i < keyNum.length; i++) {
    keyNum[i].addEventListener("click", ansNum);
}

ansCleanError = function () {
    ans.innerText = "0";
    console.log("ansCleanError() onclick", temp);
};
keyCleanError.addEventListener("click", ansCleanError);

ansClean = function () {
    ans.innerText = "0";
    temp = {};
    doReset = true;
    console.log("ansClean() onclick", temp);
};
keyClean.addEventListener("click", ansClean);

ansBackSpace = function () {
    last = ans.innerText.length - 1;
    if (ans.innerText.length > 1) {
        ans.innerText = ans.innerText.substring(0, last);
        console.log("ansBackSpace() onclick:BackSpace");
    } else {
        ans.innerText = "0";
        console.log("ansBackSpace() onclick:return to Zero");
    }
};
keyBackSpace.addEventListener("click", ansBackSpace);

ansEqual = function () {
    temp.val2 = ans.innerText;
    console.log(temp);
    switch (temp.opt) {
        case "add":
            output = Number(temp.val1) + Number(temp.val2);
            break;
        case "minus":
            output = Number(temp.val1) - Number(temp.val2);
            break;
        case "times":
            output = Number(temp.val1) * Number(temp.val2);
            break;
        case "divide":
            output = Number(temp.val1) / Number(temp.val2);
            break;
        default:
            break;
    }

    // ans.innerText = output.toPrecision(9);
    ans.innerText = output;

    doReset = true;
    temp = {};
    console.log("ansEqual() onclick");
};
keyEqual.addEventListener("click", ansEqual);

ansCalculate = function () {
    temp.val1 = ans.innerText;
    temp.opt = this.value;
    ans.innerText = "0";
    console.log("ansCalculate() onclick");
    doReset = true;
};
for (i = 0; i < keyCalculate.length; i++) {
    keyCalculate[i].addEventListener("click", ansCalculate);
}

