import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();


//setting up view engine
app.set("view engine", "ejs");


app.use(cookieParser());







app.get("/", (req, res) => {

    const { token } = req.cookies;
    if (token) {
        res.render("logout");
    }
    else {
        res.render("login");
    }
});

app.post("/login", (req, res) => {

    res.cookie("token", "hiashish", {
        httpOnly: true, // for security purpose ..so that client can not excess it
        expires: new Date(Date.now() + 120 * 1000),
    });
    res.redirect("/");
});




app.get('/logout', (req, res) => {

    res.cookie("token", null, {
        httpOnly: true, // for security purpose ..so that client can not excess it
        expires: new Date(Date.now()),

    });
    res.redirect("/");
});


app.get('/cookiesdata', (req, res) => {
    /**cookies is a middle ware function we can not use it directly...we requre cookie parser for it */
    const data = req.cookies;
    console.log(data);
    res.send(data);
})







app.listen(5000, () => {
    console.log("Server connected");
})