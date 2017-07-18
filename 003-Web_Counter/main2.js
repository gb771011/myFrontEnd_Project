console.log("main2.js loaded");

// function:轉換時分秒(hh:mm:ss)為秒(s)
/*
function hms2s(hh, mm, ss) {
    hh = (hh === "") ? 0 : parseInt(hh);
    mm = (mm === "") ? 0 : parseInt(mm);
    ss = (ss === "") ? 0 : parseInt(ss);
    return hh * 3600 + mm * 60 + ss;
}
*/
// object:轉換時分秒(hh:mm:ss)為秒(s)

var hms2s = {
    hms: [0, 0, 0],
    times: [3600, 60, 1],
    ans: 0,
    total: function () {
        var ans = 0;
        //  array.forEach
        this.hms.forEach(function (val, i) {
            // console.log(val, i, this.times[i]);
            ans += val * this.times[i];
        }, this);
        this.ans = ans;
        return ans;
    }
};
/*
*/
// 轉換秒(s)為時分秒[hh,mm,ss]
function s2hms(ss) {
    var hh, mm, result;
    ss = (ss === "") ? 0 : parseInt(ss);
    hh = Math.floor(ss / 3600);
    ss -= hh * 3600;
    mm = Math.floor(ss / 60);
    ss -= mm * 60;
    result = [hh, mm, ss];
    return result;
}

// 計時器物件設計
function Counter() {
    this.step = 0,
        this.times = [],
        this.times_last = [],
        this.mode = [],
        this.set = function (id, ans) {
            this.times[id] = ans;
            this.times_last[id] = ans;
            console.log("set:", id, ans);
        },
        this.start = function (id) {
            this.mode[id] = 1;
            console.log("start:", id);
        },
        this.pause = function (id) {
            this.mode[id] = 0;
            console.log("pause:", id);
        },
        this.stop = function (id) {
            this.times[id] = 0;
            this.mode[id] = 0;
            console.log("stop:", id);
        },
        this.reset = function (id) {
            this.times[id] = this.times_last[id];
            console.log("reset:", id);
        },
        this.init = function (count, stepms) {
            this.step = stepms;
            for (i = 0; i < count; i++) {
                this.times[i] = 0;
                this.mode[i] = 0;
            }
            // console.log("counter.init");
        },
        this.loop = function () {
            for (var i = 0; i < this.times.length; i++) {
                if ((this.times[i] > 0) && (this.mode[i] > 0)) {
                    this.times[i] -= (this.step / 1000);
                } else {
                    this.times[i] = 0;
                }
            }
            console.log(this.times);
        };
}
var counter = new Counter();
// 頁面初始化
function counterInit(id_template, id_container, times) {
    //  資料初始化
    counter.init(times, 1000);

    // UI初始化
    for (var i = 0; i < times; i++) {
        $(id_container).html(function (index, last) {
            return last + $(id_template).html().replace(/#id/g, i);
        });
        UIrender(i, "init");
    }
    // 按鈕狀態:default

}

// 初始化

var counterNumber = 3 + Math.ceil(Math.random() * 3);
counterInit("#template", "#container", counterNumber);

// UI變更
function UIrender(id, status) {
    var i, ans,
        hint = $("#" + id).children(".hint"),
        btn_g1 = $("#" + id + " .g1"),
        btn_g2 = $("#" + id + " .g2");
    switch (status) {
        case "init":
            /*
             deafult or 待機 (counter.mode[id]=0):
               .g2(start,pause,stop) >> disabled="ture"
               #hint : backgroungColor="green"
            */
            // console.log("hint", hint.css("backgroundColor"));
            hint.css("backgroundColor", "lime");
            // console.log(id,btn_g2);
            for (i = 0; i < btn_g2.length; i++) {
                btn_g2[i].disabled = true;
            }
            break;
        case "set":
            /*
            設定:
                btn_start: disabled=false                
            */
            btn_g2[0].disabled = false;

            break;
        case "start":
            /*
            set,reset >> disabled=true
            hint.bgcolor>>red
            */
            hint.css("backgroundColor", "red");
            btn_g1[0].disabled = true;
            btn_g1[1].disabled = true;
            btn_g2[1].disabled = false;
            btn_g2[2].disabled = false;
            break;
        case "pause":
            btn_g2[1].disabled = true;
            break;
        case "stop":
            btn_g1[0].disabled = false;
            btn_g1[1].disabled = false;
            break;
        default:
            break;
    }

}


// 按鈕動作(統一偵測>>依id,class分流)
$("button").click(function () {
    var pid = $(this).parent("section").attr("id"),
        commend = this.classList[1].slice(4),
        group = this.classList[0],
        inputs = $(this).siblings("input"),
        buttons = $(this).siblings("button");

    // UIrender(pid, "default");


    switch (commend) {
        case "set":
            for (var i in inputs) {
                if (!isNaN(parseInt(i))) {
                    hms2s.hms[i] = parseInt(inputs[i].value);
                }
            }
            counter.set(pid, hms2s.total());
            UIrender(pid, "set");
            break;
        case "start":
            counter.start(pid);
            UIrender(pid, "start");
            break;
        case "pause":
            counter.pause(pid);
            UIrender(pid, "pause");
            break;
        case "stop":
            counter.stop(pid);
            UIrender(pid, "init");
            break;
        case "reset":
            counter.reset(pid);
            break;
        default:
            console.log("none");
            break;
    }
    /*
    */
});

// setInterval(function () { counter.loop(); }, 1000);
