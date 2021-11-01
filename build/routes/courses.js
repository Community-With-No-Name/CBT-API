"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const cors_1 = __importDefault(require("cors"));
const CoursesController_1 = __importDefault(require("../controller/CoursesController"));
router.use((0, cors_1.default)());
router.post("/", (req, res) => CoursesController_1.default.AddCourse(req, res));
router.get("/", (req, res) => CoursesController_1.default.GetCourses(req, res));
router.get("/:id", (req, res) => CoursesController_1.default.GetCourse(req, res));
router.delete("/:id", (req, res) => CoursesController_1.default.DeleteCourse(req, res));
module.exports = router;
