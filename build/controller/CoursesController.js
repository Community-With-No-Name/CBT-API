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
const Courses_1 = __importDefault(require("../models/Courses"));
// const key = process.env.SECRET_KEY || "secret"
class CoursesController {
    static AddCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.send(decode)
            const { courseName, faculty } = req.body;
            const newCourse = {
                courseName, faculty
            };
            yield Courses_1.default.findOne({ courseName })
                .then((course) => {
                if (course) {
                    console.log(course);
                    res.json({ message: `${courseName} exists already` });
                }
                if (!course) {
                    // console.log(Courses)
                    Courses_1.default.create(newCourse).then(() => {
                        res.json({ data: newCourse, message: `${courseName} added to the course list successfully` });
                    });
                }
            })
                .catch((err) => {
                res.send("error" + err);
            });
        });
    }
    static GetCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Courses_1.default.find().then(course => {
                course && res.json({ message: "All Courses Retrieved Successfully", data: course, total: course.length });
                !course && res.json({ message: "Unexpected Error" });
            });
        });
    }
    static GetCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Courses_1.default.findOne({ _id: req.params.id }).then(course => {
                course && res.json({ message: "Course Retrieved Successfully", data: course });
                !course && res.json({ message: "No Course With that ID" });
            });
        });
    }
    static DeleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(Courses_1.default.findOneAndDelete({ _id: req.params.id }).then(() => __awaiter(this, void 0, void 0, function* () {
                yield Courses_1.default.find().then(course => {
                    course && res.json({ message: "All Courses Items Retrieved Successfully", data: course });
                    !course && res.json({ message: "Unexpected Error" });
                });
            })));
        });
    }
}
exports.default = CoursesController;
