const mongoose = require('mongoose');

const QuestionsSchema = new mongoose.Schema({
    courseName: String,
    courseId: String,
    questions: [{
        questionId: String,
        question: String,
        answer: String,
        options: [String]
    }],
    modified: {
        type: Date,
        default: Date.now
    },
    created:{
        type: Date,
        default: Date.now
    }
})
const Questions = mongoose.model('Questions', QuestionsSchema);
export default Questions;
