import express from "express"
var router = express.Router()
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import AuthController from '../controller/AuthController';
router.use(cors())

router.get("/", (req, res)=> AuthController.GetUser(req, res))
router.post("/login", (req, res)=> AuthController.Login(req, res))
router.post("/register", (req, res)=> AuthController.SignUp(req, res))

module.exports = router