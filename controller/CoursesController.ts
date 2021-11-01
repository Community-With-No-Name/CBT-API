import express from "express";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import Courses from "../models/Courses";
// const key = process.env.SECRET_KEY || "secret"
class CoursesController {
  static async AddCourse(req, res) {
    // res.send(decode)
    const { courseName, faculty } = req.body;
    const newCourse = {
      courseName, faculty
    };
    await Courses.findOne({courseName})
      .then((course) => {
        if (course) {
          console.log(course);
          res.json({ message: `${courseName} exists already` });
        }
        if (!course) {
          // console.log(Courses)
          Courses.create(newCourse).then(() => {
            res.json({ data: newCourse, message: `${courseName} added to the course list successfully` });
          });
        }
      })
      .catch((err) => {
        res.send("error" + err);
      });
  }
  static async GetCourses(req, res) {
    await Courses.find().then(course=>{
      course && res.json({message: "All Courses Retrieved Successfully", data: course, total: course.length})
      !course && res.json({message: "Unexpected Error"})
    })
  }
  static async GetCourse(req, res) {
    await Courses.findOne({_id: req.params.id}).then(course=>{
      course && res.json({message: "Course Retrieved Successfully", data: course})
      !course && res.json({message: "No Course With that ID"})
    })
  }
  static async DeleteCourse(req, res) {
    await Promise.all(Courses.findOneAndDelete({_id: req.params.id}).then(async ()=>{
      await Courses.find().then(course=>{
        course && res.json({message: "All Courses Items Retrieved Successfully", data: course})
      !course && res.json({message: "Unexpected Error"})
      })
    }))
  }
}
export default CoursesController;
