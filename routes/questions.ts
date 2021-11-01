import express from "express"
var router = express.Router()
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import QuestionsController from '../controller/QuestionsController';
router.use(cors())

router.post("/", (req, res) => QuestionsController.AddQuestion(req, res))
router.get("/questions/:courseId/:courseName", (req, res) => QuestionsController.GetAllQuestions(req, res))
router.get("/:courseId/:questionId", (req, res) => QuestionsController.GetQuestion(req, res))
router.delete("/c", (req, res) => QuestionsController.DeleteQuestion(req, res))


module.exports = router