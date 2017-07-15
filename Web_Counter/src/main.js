// prototype setting
function Time(hour, min, sec) {
    this.origin = {
        hour: parseInt(hour),
        min: parseInt(min),
        sec: parseInt(sec),
    },
        this.goal = {
            hour: 0,
            min: 0,
            sec: 0,
        },
        this.add = function (input) {
            var hh = input[0], mm = input[1], ss = input[2];
            this.goal.sec += this.origin.sec + parseInt(ss);
            if (this.goal.sec > 59) {
                this.goal.sec -= 60;
                this.goal.min += 1;
            }
            this.goal.min += this.origin.min + parseInt(mm);
            if (this.goal.min > 59) {
                this.goal.min -= 60;
                this.goal.hour += 1;
            }
            this.goal.hour += this.origin.hour + parseInt(hh);
        };
}

// #btn_set
var d, dis, period;
function time_set() {
    d = new Date();

    dis = new Time(d.getHours(), d.getMinutes(), d.getSeconds());

    period = [$("#dis_hour").val(), $("#dis_min").val(), $("#dis_sec").val()];

    dis.add(period);

    console.log("t0:", dis.origin);
    console.log("t1:", dis.goal);
    $("#console").html(
        "t0:" + JSON.stringify(dis.origin) + "<br>" + "t1:" + JSON.stringify(dis.goal));
}
// $("#btn_set").click(function () { time_set(); });

// start
/*秒-1，
當秒<0:分-1，秒=59
當分<0:時-1，分=59*/
function start(launch) {
    if (launch) {
        setInterval(function () {
            var hour = parseInt($("#dis_hour").val()),
                min = parseInt($("#dis_min").val()),
                sec = parseInt($("#dis_sec").val());
            if (sec - 1 < 0) {
                sec = 59;
                min -= 1;

            } else {
                sec -= 1;
            }
            $("#dis_sec").val(sec);
            $("#dis_min").val(min);
        }, 1000);

    }
}
start(false);

function tt() {
    var t, t0, t1, td, td_h;
    t = new Date();
    t0 = t.valueOf();
    t1 = t.setHours(17, 43, 49);
    td = (t1 - t0) / 1000;

    td_h = Math.floor(td / 3600);
    td -= (3600 * td_h);
    td_m = Math.floor(td / 60);
    td -= (60 * td_m);
    console.log(td_h, td_m, td);
}

/*
var i, date, now = {};
setInterval(function () {
    now = {
        hour: new Date().getHours(),
        min: new Date().getMinutes(),
        sec: new Date().getSeconds()
    };
    for (i in now) {
        // console.log("dis_" + i);
        $("#dis_" + i).val(now[i]);
    }
}, 1000);
*/

 /*
         // 個別按鈕動作 
         // pid = $(this).parent("section").attr("id")
                 /       $(".btn_set").click(function () {
                    var parentId = parseInt(1 + this.parentNode.id),
                        inputs = $("#" + parentId).children("input");
                    counter.set(parentId, inputs[0].value, inputs[1].value, inputs[2].value);
                    // $("span.mode").css("backgroundColor", "red");
                    $("span.mode")[parentId + 1].style.backgroundColor = "red";
                    console.log($("span.mode")[parentId].style.backgroundColor);
        
                });
        $(".btn_set").click(function () {
            
            // 1. 將時間(inputs)的值輸入到counter裡
            
        var pid = $(this).parent("section").attr("id"),
            inputs = $(this).siblings("input[type=number]")
            ;

        for (i in inputs) {
            if (!isNaN(parseInt(i))) {
                hms2s.hms[i] = parseInt(inputs[i].value);
            }
        }
        console.log("id:", pid, "set:", hms2s.total());
        });

        $(".btn_start").click(function () {
            var parentId = this.parentNode.id;
            if (counter.times[parentId] > 0) {
                counter.start(parentId);
            } else {
                // alert("Set Time First,Please");
            }
            // $(this).prop("disabled", true);
        });
        $(".btn_pause").click(function () {
            var parentId = this.parentNode.id;
            counter.mode_pause(parentId);
            // $(".btn_start").prop("disabled", false);
        });
        $(".btn_stop").click(function (i) {
            var parentId = this.parentNode.id;
            counter.mode_stop(parentId);
        });
        $(".btn_reset").on("click", function (e) {
            var parentId = e.currentTarget.parentElement.id;
            counter.mode_reset(parentId);
        });
*/