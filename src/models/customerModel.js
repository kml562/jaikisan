import mongoose from "mongoose";
const { Schema, model } = mongoose;

const customerScema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    mobileNumber: {
      type: Date,
      require: true,
      
    },
    emailID: {

      type: String,
      require: true,
      unique: true
    }
    ,
  
    DOB: {
      type: String,
      require: true,
      unique: true,
    },
    address: {
      type: String,
      require: true
    }
    ,
    customerID: {
      type: String,
      require: true,
      unique: true,
    },
    status: {
      type: String,
      require: true,
      default: "ACTIVE",
      enum:["IINACTIVE","ACTIVE"],
    }
    
  },
  { timestamps: true }
);

const CustomerModel = model("customerModel", customerScema);

export default CustomerModel;


/*Customer collection field:
Field Type Description
firstName string
lastName string
mobileNumber string 10 digits long
DOB date
emailID string abc@xyz.com
address string
customerID string UUID
status string ACTIVE / INACTIVE */