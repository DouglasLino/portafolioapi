const {Schema, model} = require('mongoose')

var UserSchema = Schema({
    fullname: {
        type: "String",
        require: true
    },
    username:{
        type: "String",
        require: true,
        unique: true,
        min: 6
    },
    email:{
        type: "String",
        require: true,
        unique: true
    },
    password:{
        type: "String",
        require: true
    },
    phone:{
        type: "String"
    },
    // Date of birth
    dob:{
        type: "Date"
    }
})

module.exports = model("User", UserSchema)