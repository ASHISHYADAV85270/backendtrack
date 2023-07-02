import mongoose from 'mongoose';
// to avoid hacking 
mongoose.set('strictQuery', true);
export const connectDB = () => {
    //db name boo hoga jis database mai daalna hai ...agr  nhi hoga to fir bnjaiga 
    mongoose
        .connect(process.env.MONGO_URL, { dbName: "backendashish", })
        .then(() => { console.log("data base connected") })
        .catch((err) => { console.log(err) });
}