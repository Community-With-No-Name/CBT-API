import express from "express"
var router = express.Router()
import cors from "cors"
import CoursesController from '../controller/CoursesController';
router.use(cors())

router.post("/", (req, res) => CoursesController.AddCourse(req, res))
router.get("/", (req, res) => CoursesController.GetCourses(req, res))
router.get("/:id", (req, res) => CoursesController.GetCourse(req, res))
router.delete("/:id", (req, res) => CoursesController.DeleteCourse(req, res))


module.exports = router