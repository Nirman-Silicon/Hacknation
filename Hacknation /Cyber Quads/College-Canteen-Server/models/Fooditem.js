const { default: mongoose } = require("mongoose");
const req = require("mongoose");
const { Schema } = mongoose;

const FoodSchema = new Schema({
    // id:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'user'
    // },
    imageurl:{
        type:String
    },
    name:{
        type: String,
        required: true
    },
    shopName:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    dsc:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('food', FoodSchema);
