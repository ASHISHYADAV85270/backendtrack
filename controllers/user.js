import { UserModel } from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const getAllusers = async (req, res) => {
    const userdata = await UserModel.find({});
    console.log(req.query);// ? kai baad vaali values 
    // http://localhost:5000/getusers/all?name=ashish&age=22
    res.json({
        success: true,
        users: userdata
    })
}


export const getUserById = async (req, res) => {
    const { id } = req.params;
    const userdata = await UserModel.findById(id)
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
}


export const addNewUser = async (req, res) => {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = { name, email, phone, password: hashedPassword };
    res.cookie("token", name);
    await UserModel.create(data);
    res.send("data created successfully");
}