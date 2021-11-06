import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/Users";
const key = process.env.SECRET_KEY || "secret";
class AuthController {
  static async Login(req, res) {
    const { email, password } = req.body;
    // console.log(req.body);
    await Users.findOne({email}).then((user) => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const payload = {
            userId: user._id,
            email: user.email,
            faculty: user.faculty,
            fullName: user.fullName,
            department: user.department,
          };
          let token = jwt.sign(payload, key);
          res.json(token);
        } else {
          res.json({ error: "Passwords do not match" });
        }
      } else {
        res.json({
          error: "User does not exist",
        });
      }
    });
  }
  static async SignUp(req, res) {
    const { fullName, password, email, faculty, department } = req.body;
    const NewUser = {
      fullName,
      password,
      email,
      faculty,
      department,
    };
    await Users.findOne({email}).then((user) => {
      if(!user) {
        bcrypt.hash(password, 10, (err, hash) => {
          NewUser.password = hash;
          const hashedUser = new Users(NewUser)
          // Customer.create(customerData).then(() => {
          hashedUser.save().then(() => {
            res.json({ message: `${fullName}'s Account Created Successfully` });
          });
        })
      }
      else {
        res.json({
          error: "An account already exists with that email address"
        })
      }
    })
  }
  static async GetUser(req, res) {
    var decode = jwt.verify(req.headers['authorization'], key)
    res.json({user: decode})
  }
}
export default AuthController;
