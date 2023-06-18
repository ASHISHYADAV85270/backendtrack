import express from 'express';

const app = express();
import fs from 'fs';
import path from 'path';

app.get("/", (req, res) => {
    res.send("hiiiiiiiii normal url");
});
app.get("/data", (req, res) => {
    res.send("dhek beta status code change krdia").status(404); //to set the status code 
});
app.get("/myapi", (req, res) => {
    res.json({
        success: true,
        products: ["shoes,leather"]
    }); //to set the status code 
})
app.get("/homefile", (req, res) => {
    const file = fs.readFileSync("./home.html");
    // console.log(__dirname);//IT CAN BE ONLY IN COMMON TPE BALA
    console.log(path.resolve());
    const pathlocation = path.resolve();

    res.sendFile(path.join(pathlocation, "./home.html"));
})


app.listen(5000, () => {
    console.log("server is working");
})