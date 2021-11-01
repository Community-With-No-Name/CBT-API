"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const UserCoursesSchema = new mongoose.Schema({
    userId: String,
    courses: [{ courseId: String, courseName: String }],
    modified: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
});
const UserCourses = mongoose.model('UserCourses', UserCoursesSchema);
exports.default = UserCourses;
