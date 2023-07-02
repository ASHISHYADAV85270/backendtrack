
import express from "express";

import { UserModel } from "../models/userModel.js";
import { addNewUser, getAllusers, getUserById } from "../controllers/user.js";

const router = express.Router();
//ismai by default getusers add hoga because boo common hai sbko
router.get('/', async (req, res) => {
    res.json({
        success: true,
        message: "I will teach u how to send post request by postman"
    })
});
router.get('/all', getAllusers);
router.get('/:id', getUserById);
router.post('/createuser/new', addNewUser);


export default router; 