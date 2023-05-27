import mongoose from 'mongoose'
const objectId = mongoose.Schema.Types.ObjectId;
const { Schema, model } = mongoose;

const cardSchema = new Schema({
    cardNumber: {
        type: String,
        required: true,
        unique: true,
        
    },
    cardType: {
        type: String,
        enum: ["REGULAR", "SPECIAL"],
        default: "REGULAR",
        required: true,
    },
    customerName: {
        type: String,
        require: true,
    
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        require: true,
        default: "ACTIVE"
    },
    vision: {
        type: String,
        require: true,
    },
    customerID:{
        type:objectId,
        ref:"authorModel",
        require: true,
       isValid:true,
    },

}, { timestamps: true})




const CardModel = model('cardModel', cardSchema);
export default CardModel;