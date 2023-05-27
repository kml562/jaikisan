import CustomerModel from "../models/customerModel.js";
import { loopmethod, toLowercase } from "../utils/validation/functionval.js";
import {
  isValid,
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../utils/validation/validatior.js";

import { isValidObjectId } from "mongoose";

export const CreateCustmomer = async (req, res) => {
  try {
    let Data = req.body;
    const {
      firstName,
      lastName,
      mobileNumber,
      emailID,
      password,
      address,
      customerID,
      status,
    } = Data;

    //first name------------------------------------------------------------------------------------------
    if (!firstName.trim())
      return res.status(404).json({ error: "please enter the first name" });
    if (!isValidName(firstName) && !isValid(firstName))
      return res
        .status(404)
        .json({ error: "please enter the valid first name" });

    //last name-----------------------------------------------------------------------------------
    if (!lastName.trim())
      return res.status(404).json({ error: "please enter the last name" });
    if (!isValidName(lastName) && !isValid(lastName))
      return res
        .status(404)
        .json({ error: "please enter the valid last name" });
    //mobileNumber-----------------------------------------------------------------------------------------
    if (!mobileNumber.trim())
      return res.status(404).json({ error: "please enter the mobileNumber" });
    if (
      !isValidName(mobileNumber) &&
      !isValid(mobileNumber) &&
      mobileNumber.trim().length !== 10
    )
      return res
        .status(404)
        .json({ error: "please enter the valid mobileNumber" });

    //emailID------------------------------------------------------------------------------------------
    if (!emailID.trim())
      return res.status(404).json({ error: "please enter the emailID" });
    if (!isValidEmail(emailID) && !isValid(emailID))
      return res.status(404).json({ error: "please enter the valid emailID" });
    //emailID = tolowercase(emailID);
    let val = toLowercase(emailID);
    Data.emailID = val;
    //password---------------------------------------------------------------------------------------
    if (!password.trim())
      return res.status(404).json({ error: "please enter the password" });
    if (!isValidPassword(password) && !isValid(password))
      return res.status(404).json({ error: "please enter the valid password" });

    Data = loopmethod(Data); //triming all the strings;-----------------------------------------====
    // find the emailID is exits in userbase or not;----------------------------------------------
    let findData = await CustomerModel.findOne({ emailID: Data.emailID });
    if (findData) {
      return res
        .status(401)
        .json({ status: false, message: "emailID already exists in database" });
    }

    //address------------------------------------------------------------------------------------------
    if (!address.trim())
      return res.status(404).json({ error: "please enter the address" });
    if (!isValid(address))
      return res.status(404).json({ error: "please enter the valid address" });

    //customerID-------------------------------------------------------------------------------
    if (!customerID.trim())
      return res.status(404).json({ error: "please enter the customer Id" });
    if (! isValidObjectId(customerID))
      return res.status(404).json({ error: "please enter the valid custmoer Id" });

    //hashing  the password-------------------------------------------------------------------
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    Data.password = hashedPassword; // returning the hashed password;
    const saveData = await CustomerModel.create(Data);
    res.status(201).json({ status: true, Data: saveData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// export const getuser = async (req, res) => {
//   try {
//     let Data = await CustomerModel.find();
//     res.status(200).json({ status: true, message: Data });
//   } catch (error) {
//     res.status(500).json({ status: false, message: error.message });
//   }
// };

// //loging the user in------------------------------------------------------------

// export const getAuthor = async function (req, res) {
//   try {
//     const authors = await CustomerModel.find();
//     res.status(200).send({ status: true, authors: authors });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { emailID, password } = req.body;

//     // emailID validation-----------------------------------------------------------------
//     if (!emailID.trim())
//       return res.status(404).json({ error: "Please enter the emailID" });
//     if (!isValidEmail(emailID))
//       return res.status(404).json({ error: "Please enter a valid emailID" });

//     // Password validation--------------------------------------------------------------
//     if (!password.trim())
//       return res.status(404).json({ error: "Please enter the password" });
//     if (!isValidPassword(password))
//       return res.status(404).json({ error: "Please enter a valid password" });

//     const author = await CustomerModel.findOne({ emailID }).select("password");

//     if (!author)
//       return res
//         .status(500)
//         .json({ status: false, message: "You are not registered" });

//     const isValidAuthor = bcrypt.compare(password, author.password);

//     if (isValidAuthor) {
//       const token = jwt.sign({ id: author._id }, JWT_SECRET, {
//         expiresIn: JWT_EXPIRY,
//       });

//       res.status(200).json({ status: true, data: { token } });
//     } else {
//       res.status(401).json({ status: false, message: "Invalid password" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "An error occurred" });
//   }
// };
