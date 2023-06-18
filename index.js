// const http = require("http"); //build in module
import http from 'http';



//nodemon is 3rd party module


//it is file module
// const gfName = require('./features');

import { gfName1, generate_love } from './features.js'; //modern
import gfName from './features.js'; //modern

console.log(gfName);
console.log(gfName1);
const percent = generate_love();
// console.log(percent);



import fs from "fs";
// const home = fs.readFile('./index.html', () => {
//     console.log("File Read");
// })


const server = http.createServer((req, res) => {
    console.log(req.url);


    // this is server routing not react routing
    if (req.url === "/about") {
        res.end("about page");
    }
    else if (req.url === "/contact") {
        res.end("contact page");
    }
    else if (req.url === "/home") {
        fs.readFile('./home.html', (err, data) => {
            console.log("File Read");
            console.log("data", data);
            res.end(data);
        })

    }
    else if (req.url === "/pyaar") {
        res.end(`pyaar bgera dhoka hai dhek le apni percent ${percent}`);
    }
    else {
        res.end("PAge not found");
    }
});


server.listen(5000, () => {
    console.log("server is listing");
})