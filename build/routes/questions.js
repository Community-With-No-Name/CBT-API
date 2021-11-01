"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const cors_1 = __importDefault(require("cors"));
const QuestionsController_1 = __importDefault(require("../controller/QuestionsController"));
router.use((0, cors_1.default)());
router.post("/", (req, res) => QuestionsController_1.default.AddQuestion(req, res));
router.get("/questions/:courseId/:courseName", (req, res) => QuestionsController_1.default.GetAllQuestions(req, res));
router.get("/:courseId/:questionId", (req, res) => QuestionsController_1.default.GetQuestion(req, res));
router.delete("/c", (req, res) => QuestionsController_1.default.DeleteQuestion(req, res));
module.exports = router;
