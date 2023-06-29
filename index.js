import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
const app = express();
import bcrypt from "bcrypt";

// to avoid hacking 
import jwt from 'jsonwebtoken';
//setting up view engine
app.set("view engine", "ejs");

/* to access form  we need a middleware*/
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


mongoose.connect('mongodb://localhost:27017', { dbName: "backendashish", }).then(() => { console.log("data base connected") }).catch((err) => { console.log(err) });



const Userschema = mongoose.Schema({
    name: String,
    email: String,
    password: String,

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
        next();
    }
    else {
        res.redirect("/login");
    }
}


//done
app.get("/", isAuthenticated, (req, res) => {
    res.render("logout");
});

//done
app.get('/register', (req, res) => {
    res.render('register');
})

//done
app.get('/login', (res, req) => {
    req.render('login');
})



// done
app.get('/logout', (req, res) => {
    res.cookie("token", null, {
        httpOnly: true, // for security purpose ..so that client can not excess it
        expires: new Date(Date.now()),
    });
    res.redirect("/");
});



app.post("/login", async (req, res) => {
    /*  to avoid insertion of same user*/
    const { password, email } = req.body;
    const userdata = await UserModel.findOne({ email });
    if (!userdata) {
        return res.redirect("/register");
    }


    const isMatch = await bcrypt.compare(password, userdata.password);

    console.log(password);
    if (isMatch) {

        const token = jwt.sign({ _id: userdata._id }, "qwerty");

        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 1000),
        });
        return res.render('logout', { name: userdata.name });
    }
    else {
        res.render('login', { message: "Wrong Password" });
        return res.redirect('/login');
    }
});


app.post('/register', async (req, res) => {
    /*  to avoid insertion of same user*/
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userdata = await UserModel.findOne({ email });
    if (userdata) {
        return res.redirect('/login');
    }
    const newuserdata = await UserModel.create({
        name, email, password: hashedPassword,
    });
    res.redirect("/");
})
app.listen(5000, () => {
    console.log("Server connected");
})