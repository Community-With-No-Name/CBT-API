const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
    courseName: String,
    faculty: [String],
    modified: {
        type: Date,
        default: Date.now
    },
    created:{
        type: Date,
        default: Date.now
    }
})
const Courses = mongoose.model('Courses', CoursesSchema);
export default Courses;
