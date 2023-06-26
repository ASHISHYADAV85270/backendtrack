import express from "express";
const app = express();
import path from 'path';

//setting up view engine
app.set("view engine", "ejs");


/*excessing static folder --ismai front end ka project  jaiga*/
// express.static('./public'); // we can use it like this 
// express.static(path.join(path.resolve(), "public")); //it is a middleware..so use app.use
// console.log(path.join(path.resolve(), "public"));
app.use(express.static(path.join(path.resolve(), "public")));

app.get('/', (req, res) => {
    //render isliye use krtai hai jis sai dynamic data bhej skai 
    res.render("index", { name: "ASHISH" });  //but by default public baale pai jaiga
})

app.get('/haha', (req, res) => {
    res.sendFile("index.html"); //ismaai absolute path dene kii need nhi hai because hmnai set krdia hai ki hmara static folder y hai
})
app.listen(5000, () => {
    console.log("server is working");
})