/*const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/LoginPractice", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB is connected successfully");
})
.catch((err) => {
    console.log("Failed to connect to MongoDB", err);
});


const loginschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const collection = new mongoose.model("Collection1", loginschema)

module.exports = collection*/
