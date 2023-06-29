import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
const app = express();

//setting up view engine
app.set("view engine", "ejs");

/* to access form  we need a middleware*/
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


mongoose.connect('mongodb://localhost:27017', { dbName: "backendashish", }).then(() => { console.log("data base connected") }).catch((err) => { console.log(err) });



const Userschema = mongoose.Schema({
    name: String,
    email: String
});





const UserModel = mongoose.model("Userdata", Userschema);

//it is a middleware or we can say it is a handler .... 
const isAuthenticated = (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        next();
    }
    else {
        res.render("login");
    }
}



app.get("/", isAuthenticated, (req, res) => {
    res.render("logout");
});

app.post("/login", async (req, res) => {

    const { name, email } = req.body;
    console.log(name, email);
    const newuserdata = await UserModel.create({
        name, email
    }).then(() => {
        console.log("successfully saved to data base");
    });


    res.cookie("token", newuserdata, {
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