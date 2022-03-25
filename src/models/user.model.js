
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    first_name : {type : String, required : true},
    last_name : {type : String, required : true},
    email : {type : String, required : true},
    role : {type : String, required : true, enum : ["user", "admin"], default : "user"},
},
{
    timestamps : true,
    versionKey : false
});

const User1 = mongoose.model("user", UserSchema);

module.exports = User1;