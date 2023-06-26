import express from "express";
const app = express();
import path from 'path';


const users = [];
/* to access form  we need a middleware*/
app.use(express.urlencoded({ extended: true }))

//setting up view engine
app.set("view engine", "ejs");


app.get('/', (req, res) => {
    res.render("index");
})

app.get('/giveusers', (req, res) => {
    res.json({ users, });
})
app.get('/success', (req, res) => {
    res.render("success");
})

app.post('/contactus', (req, res) => {
    console.log(req.body);
    users.push({
        Username: req.body.name,
        Useremail: req.body.email
    });
    res.redirect("/success");

})


app.listen(5000, () => {
    console.log("server is working");
})