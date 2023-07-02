
import express from "express";

import { UserModel } from "../models/userModel.js";

const router = express.Router();
router.get('/', (req, res) => {
    res.redirect('/getusers');
})
router.get('/getusers', async (req, res) => {

    res.json({
        success: true,
        message: "I will teach u how to send post request by postman"
    })
});

router.get('/getusers/all', async (req, res) => {
    const userdata = await UserModel.find({});
    console.log(req.query);// ? kai baad vaali values 
    // http://localhost:5000/getusers/all?name=ashish&age=22
    res.json({
        success: true,
        users: userdata
    })
});


//dynamic  isko sbsai nichai use krna hmesha
router.get('/getusers/:id', async (req, res) => {
    const { id } = req.params;
    const userdata = await UserModel.findById(id)
        .then(() => { console.log("value hai") })
        .catch((err) => { console.log(err) });
    if (userdata) {
        res.json({
            userdata
        });
    }
    else {
        res.json({
            message: "Please put a valid id"
        })
    }

});




router.post('/createuser/new', async (req, res) => {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = { name, email, phone, password: hashedPassword };
    res.cookie("token", name);
    await UserModel.create(data);
    res.send("data created successfully");
});


export default router;