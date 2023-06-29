import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
const app = express();
import jwt from 'jsonwebtoken';
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
const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {

        //decoding data with the help of jwt
        const decodeddata = jwt.verify(token, "qwerty");


        //for searching and getting data 
        req.user = await UserModel.findById(decodeddata._id);
        console.log(decodeddata);

        next();
    }
    else {
        res.render("login");
    }
}



app.get("/", isAuthenticated, (req, res) => {
    console.log(req.user);
    res.render("logout", { name: req.user.name });
});

app.post("/login", async (req, res) => {

    /*  to avoid insertion of same user*/
    const { name, email } = req.body;
    const userdata = await UserModel.findOne({ email });
    if (!userdata) {
        res.send("Register First");
        return
    }


    console.log(name, email);
    const newuserdata = await UserModel.create({
        name, email
    });
    console.log("successfully saved to data base");

    // qwerty is the security key here
    const token = jwt.sign({ _id: newuserdata._id }, "qwerty");
    console.log(token);
    res.cookie("token", token, {
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

app.listen(5000, () => {
    console.log("Server connected");
})