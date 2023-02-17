const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
// const req = require("mongoose");

const UserSchema = new Schema({
    googleID:{
        type: String,
        required: false,
        unique:true,
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    phone:{
        type: Number,
        required: false,
        unique: true
    },
    passwordHash:{
        type: String,
        required: false
    },
    timestamp:{
        type: String,
        required: true,
        default: Date
    }
});

const User = mongoose.model('user', UserSchema);
// User.createIndexes();
module.exports = User;
