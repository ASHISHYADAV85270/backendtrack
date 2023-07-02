import { app } from './app.js';
import { connectDB } from './data/database.js';
connectDB();
app.listen(5000, () => {
    console.log("server created");
})  