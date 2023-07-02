import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const app = express();

// to avoid hacking 
mongoose.set('strictQuery', true);

//db name boo hoga jis database mai daalna hai ...agr  nhi hoga to fir bnjaiga 
mongoose.connect('mongodb://localhost:27017', { dbName: "backendashish", }).then(() => { console.log("data base connected") }).catch((err) => { console.log(err) });
const Userschema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String
});


const UserModel = mongoose.model("formHandling", Userschema);

//to excesss json data from body 
app.use(express.json());






app.get('/getusers/all', async (req, res) => {
    const userdata = await UserModel.find({});
    console.log(req.query);// ? kai baad vaali values 
    // http://localhost:5000/getusers/all?name=ashish&age=22
    res.json({
        success: true,
        users: userdata
    })
});


//dynamic  isko sbsai nichai use krna hmesha
app.get('/getusers/:id', async (req, res) => {
    const { id } = req.params;
    const userdata = await UserModel.findById(id);

    res.json({
        userdata
    });
});




app.post('/createuser/new', async (req, res) => {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = { name, email, phone, password: hashedPassword };
    res.cookie("token", name);
    await UserModel.create(data);
    res.send("data created successfully");
});



app.listen(5000, () => {
    console.log("server created");
})  