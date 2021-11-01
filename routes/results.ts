import express from "express"
var router = express.Router()
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import ResultController from '../controller/ResultController';
router.use(cors())
// Get User ID from the token
router.post("/add", (req, res) => ResultController.AddResult(req, res))
router.get("/", (req, res) => ResultController.GetAllResults(req, res))
router.get("/latest/:courseId", (req, res) => ResultController.GetLatestResult(req, res))
router.get("/course/:courseId", (req, res) => ResultController.GetCourseResults(req, res))
router.delete("/:courseId/:resultId", (req, res) => ResultController.DeleteResult(req, res))


module.exports = router