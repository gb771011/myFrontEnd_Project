const fs = require("fs");
const path = require("path");

let target = path.join(__dirname, "test");

fs.readlink(target, (err, ls) => {
    console.log(target,ls);
})