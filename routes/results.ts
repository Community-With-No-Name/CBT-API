import express from "express"
var router = express.Router()
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import ResultController from '../controller/ResultController';
router.use(cors())
// Get User ID from the token
router.post("/add/:courseId", (req, res) => ResultController.AddResult(req, res))
router.get("/", (req, res) => ResultController.GetAllResults(req, res))
router.get("/result/:courseId", (req, res) => ResultController.GetResult(req, res))
router.delete("/:courseId/:resultId", (req, res) => ResultController.DeleteResult(req, res))


module.exports = router