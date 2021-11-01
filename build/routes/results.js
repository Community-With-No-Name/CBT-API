"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const cors_1 = __importDefault(require("cors"));
const ResultController_1 = __importDefault(require("../controller/ResultController"));
router.use((0, cors_1.default)());
// Get User ID from the token
router.post("/add/:courseId", (req, res) => ResultController_1.default.AddResult(req, res));
router.get("/", (req, res) => ResultController_1.default.GetAllResults(req, res));
router.get("/result/:courseId", (req, res) => ResultController_1.default.GetResult(req, res));
router.delete("/:courseId/:resultId", (req, res) => ResultController_1.default.DeleteResult(req, res));
module.exports = router;
