function update(input) {
    console.dir(input);
    $("textarea").text(function (i, last) {
        return input + "\n" + last;
    });
}
var timer = {
    target: [],
    mode: [],
    set_target: function (id, hh, mm, ss) {
        (hh === undefined) ? (hh = 0) : hh;
        (mm === undefined) ? (mm = 0) : mm;
        (ss === undefined) ? (ss = 0) : ss;
        this.target[id] = (parseInt(hh) * 3600) + (parseInt(mm) * 60) + parseInt(ss);
        // this.target[id] = (hh * 3600) + (mm * 60) + ss;
    },
    set_mode: function (id, mode) {
        this.mode[id] = mode;
    },
    count: function () {
        this.target.forEach(function (val, i) {
            console.log(i, this.target[i], this.mode[i]);
        });
    }
};
// console.log(JSON.stringify(timer));
$(".btn_set").click(function () {
    var id = this.parentNode.id,
        hh = $("section#" + id).children("input[type=number]")[0].value,
        mm = $("section#" + id).children("input[type=number]")[1].value,
        ss = $("section#" + id).children("input[type=number]")[2].value
        ;
    // console.log($("section#" + id).children("input[type=number]"));
    // console.log("id=", id, "\n", hh, mm, ss);

    timer.set_target(id, hh, mm, ss);
    console.log("target:", timer.target);
});
$(".btn_start").click(function () {
    var id = this.parentNode.id;
    timer.set_mode(id, 1);
    console.log("mode:", timer.mode);
}); 