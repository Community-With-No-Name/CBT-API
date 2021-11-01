"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Questions_1 = __importDefault(require("../models/Questions"));
// const key = process.env.SECRET_KEY || "secret"
class QuestionsController {
    static AddQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.send(decode)
            const { courseName, courseId, question, answer, options } = req.body;
            yield Questions_1.default.findOne({ courseName, courseId })
                .then((qst) => {
                const questions = qst.questions;
                const newQuestion = {
                    courseName,
                    courseId,
                    questions: [
                        ...questions,
                        {
                            questionId: String(courseId) + String(Math.random()),
                            question,
                            answer,
                            options,
                        },
                    ],
                };
                Questions_1.default.create(newQuestion).then(() => {
                    res.json({ data: newQuestion, message: "Question Added successfully" });
                });
            })
                .catch((err) => {
                res.send("error" + err);
            });
        });
    }
    static GetAllQuestions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { courseId, courseName } = req.params;
            yield Questions_1.default.find({ courseId, courseName }).then((questions) => {
                questions &&
                    res.json({
                        message: "All Questions Retrieved Successfully",
                        data: questions,
                        total: questions.length,
                    });
                !questions && res.json({ message: "Unexpected Error" });
            });
        });
    }
    static GetQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { courseId, questionId } = req.params;
            yield Questions_1.default.findOne({ courseId, questions: {
                    questionId
                } }).then((question) => {
                question &&
                    res.json({
                        message: "Question Retrieved Successfully",
                        data: question,
                    });
                !question && res.json({ message: "No Question With that ID" });
            });
        });
    }
    static DeleteQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { courseId, questionId } = req.params;
            yield Questions_1.default.findOne({ courseId, questions: {
                    questionId
                } }).then((question) => {
                question.questions.remove({ questionId })
                    .then(() => {
                    res.json({
                        message: "Question removed successfully"
                    });
                });
            });
        });
    }
}
exports.default = QuestionsController;
