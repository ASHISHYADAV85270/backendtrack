import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
const app = express();

// to avoid hacking 
mongoose.set('strictQuery', true);

//db name boo hoga jis database mai daalna hai ...agr  nhi hoga to fir bnjaiga 
mongoose
    .connect('mongodb://localhost:27017', { dbName: "backendashish", })
    .then(() => { console.log("data base connected") })
    .catch((err) => { console.log(err) });


//to excesss json data from body 
app.use(express.json());
//using router is also a middle ware 
// app.use(userRouter);

/* is we want to give a custom prefix url to router */
app.use("/getusers", userRouter);






app.listen(5000, () => {
    console.log("server created");
})  