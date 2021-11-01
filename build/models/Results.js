"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const ResultsSchema = new mongoose.Schema({
    userId: String,
    courseId: String,
    courseName: String,
    score: String,
    timeElapsed: String,
    timeLeft: String,
    date: Date,
    time: String,
    modified: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
});
const Results = mongoose.model('Results', ResultsSchema);
exports.default = Results;
