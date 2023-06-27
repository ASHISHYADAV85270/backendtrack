import express from "express";
const app = express();
import path from 'path';
import mongoose from "mongoose";
//db name boo hoga jis database mai daalna hai ...agr  nhi hoga to fir bnjaiga 
mongoose.connect('mongodb://localhost:27017', { dbName: "backendashish", }).then(() => { console.log("data base connected") }).catch((err) => { console.log(err) });

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
});

//it is the name of the collection that is to be created and the schema which we are using
const Messge = mongoose.model("messageofashishes", messageSchema);





/* to access form  response data we need a middleware*/
app.use(express.urlencoded({ extended: true }))

//setting up view engine--> jissai hmlog views baale ko normal address sai bhi excess kr skai
app.set("view engine", "ejs");


// the starting point of the page
app.get('/', (req, res) => {
    res.render("index");
});




app.get('/getdata', async (req, res) => {
    res.send("data is this");
    const users = await Messge.find({});  // to get data
    console.log(users);
});

app.get('/insertdata', (req, res) => {
    const messageData = {
        name: "Abhi",
        email: "bt2ewfwe@gmail.com"
    };
    Messge.create(messageData).then(() => {
        res.send("i will teach u mongodb")
        console.log("DAta inserted");
    })
})

//using await it is usually practice in the market
app.get('/getdataasynce', async (req, res) => {
    const messageData = {
        name: "Ashish",
        email: "bt2ewf2352443252we@gmail.com"
    };
    await Messge.create(messageData);
    res.send("i will teach u mongodb by async");
});


//it the place where form is directing us
app.post('/contactus', async (req, res) => {
    const messageData = {
        name: req.body.name,
        email: req.body.email,
    };
    await Messge.create(messageData);
    res.send("data inserted succesfully")

})



app.listen(5000, () => {
    console.log("server is working");
})