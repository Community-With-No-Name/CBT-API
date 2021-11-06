import express from "express"
var router = express.Router()
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import UserCourseController from '../controller/UserCourseController';
router.use(cors())
// Get User ID from token
router.post("/", (req, res) => UserCourseController.AddCourse(req, res))
router.get("/", (req, res) => UserCourseController.GetAllCourses(req, res))
router.get("/:courseId", (req, res) => UserCourseController.GetCourse(req, res))
router.delete("/:courseId", (req, res) => UserCourseController.DeleteCourse(req, res))


module.exports = router
