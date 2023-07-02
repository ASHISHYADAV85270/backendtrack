import mongoose from 'mongoose';
const Userschema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String
});


export const UserModel = mongoose.model("formHandling", Userschema);