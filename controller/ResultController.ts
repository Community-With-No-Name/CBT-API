import express from "express";
import Results from "../models/Results";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
const key = process.env.SECRET_KEY || "secret"
class ResultController {
  static async AddResult(req, res) {
    var decode = jwt.verify(req.headers['authorization'], key)
    // res.send(decode)
    const { full_name, date, time, reason, phone_number, email } = req.body;
    const newAppointment = {
      full_name, date, time, reason, phone_number, email
    };
    await Results.findOne({ date, time })
      .then((appointment) => {
        if (appointment) {
          console.log(appointment);
          res.json({ message: "Sorry The selected date and time has been booked" });
        }
        if (!appointment) {
          // console.log(Appointment)
          Results.create(newAppointment).then(() => {
            res.json({ data: newAppointment, message: "Booking Successful" });
          });
        }
      })
      .catch((err) => {
        res.send("error" + err);
      });
  }
  static async GetAllResults(req, res) {
    const pageData = Number(req.params.page) * 10
    const nextPageData = (Number(req.params.page) + 1) * 10
    await Results.find().then(appointment=>{
      appointment && res.json({message: "All Appointments Retrieved Successfully", data: appointment.slice(pageData, nextPageData), total: appointment.length})
      !appointment && res.json({message: "Unexpected Error"})
    })
  }
  static async GetResult(req, res) {
    await Results.findOne({_id: req.params.id}).then(appointment=>{
      appointment && res.json({message: "Appointment Retrieved Successfully", data: appointment})
      !appointment && res.json({message: "No Appointment With that ID"})
    })
  }
  static async DeleteResult(req, res) {
    await Results.findOneAndDelete({_id: req.params.id}).then(async ()=>{
      await Results.find().then(Appointment=>{
        Appointment && res.json({message: "All Appointment Items Retrieved Successfully", data: Appointment})
      !Appointment && res.json({message: "Unexpected Error"})
      })
    })
  }
}
export default ResultController;
