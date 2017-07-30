// promise.js
let count = 0;
delay = (sec) => {
    return new Promise((resolve, reject) => {
        count++;
        setTimeout(function () {
            resolve(`coming ${count}`);
        }, sec);
    });
};

delay(1000)
    .then((val) => {
        console.log(val);
        return delay(2000);
    })
    .then((val) => {
        console.log(val);
        return delay(2000);
    })
    .then((val) => {
        console.log(val);
        return delay(2000);
    })
    .then((val) => {
        console.log(val);
    });