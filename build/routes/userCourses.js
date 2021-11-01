"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const cors_1 = __importDefault(require("cors"));
const UserCourseController_1 = __importDefault(require("../controller/UserCourseController"));
router.use((0, cors_1.default)());
// Get User ID from token
router.post("/", (req, res) => UserCourseController_1.default.AddCourse(req, res));
router.get("/page/:page", (req, res) => UserCourseController_1.default.GetAllCourses(req, res));
router.get("/:courseId", (req, res) => UserCourseController_1.default.GetCourse(req, res));
router.delete("/:courseId", (req, res) => UserCourseController_1.default.DeleteCourse(req, res));
module.exports = router;
