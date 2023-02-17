const { default: mongoose } = require("mongoose");
const req = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    items:{
        type: Array,
        required: true
    },
    timestamp:{
        type: String,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('order', OrderSchema);
