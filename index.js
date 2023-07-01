import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const app = express();

// to avoid hacking 
import jwt from 'jsonwebtoken';
mongoose.set('strictQuery', true);
app.use(cookieParser());

//db name boo hoga jis database mai daalna hai ...agr  nhi hoga to fir bnjaiga 
mongoose.connect('mongodb://localhost:27017', { dbName: "backendashish", }).then(() => { console.log("data base connected") }).catch((err) => { console.log(err) });
const Userschema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String
});


const UserModel = mongoose.model("formHandling", Userschema);

//setting up view engine
app.set('view engine', 'ejs');
/* to access form  we need a middleware*/
app.use(express.urlencoded({ extended: true }))
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
        return res.redirect("/login");
    }
}

app.get('/', isAuthenticated, (req, res) => {
    res.render("logout");

});


app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
})
app.get('/logout', (req, res) => {
    res.cookie("token", null, {
        httpOnly: true, // for security purpose ..so that client can not excess it
        expires: new Date(Date.now()),
    });
    res.redirect("/");
})



app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.render("login", { message: "PLEASE ENTER A VALID EMAIL" });

    }
    const userdata = await UserModel.findOne({ email: email });
    if (!userdata) {
        return res.redirect('/register');
    }

    const ismatch = await bcrypt.compare(password, userdata.get("password"));
    console.log("ismatch", ismatch);
    if (ismatch) {

        const token = jwt.sign({ _id: userdata._id }, "qwerty");

        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 1000),
        });
        res.render('logout', { name: userdata.name, email: userdata.email, phone: userdata.phone });
    }
    else {
        res.render("login", { message: "PLEASE ENTER A CORRECT PASSWORD" });
    }
})
app.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;

    const userdata = await UserModel.findOne({ email: email });
    if (userdata) {
        return res.render('login', { email: req.body.email });
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = { name, email, phone, password: hashedPassword };
        await UserModel.create(data);
        res.redirect('/');
    }
})
app.listen(5000, () => {
    console.log("server created");
})  