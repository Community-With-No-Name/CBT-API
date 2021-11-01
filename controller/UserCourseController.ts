import UserCourses from "../models/UserCourses";
import jwt from "jsonwebtoken";
const key = process.env.SECRET_KEY || "secret"
class UserCourseController {
  static async AddCourse(req, res) {
    var decode = jwt.verify(req.headers['authorization'], key)
    const { courseId, courseName } = req.body;
    // const newUserCourses = {
    //   courseId, courseName, userId: decode?.userId,
    // };
   decode && decode?.userId && await Promise.all(UserCourses.findOne({ userId: decode?.userId, courses: {
      courseId,
      courseName
    } })
      .then(async(courses) => {
        if (courses) {
          res.json({ message: `${courseName} already exists` });
        }
        if (!courses) {
          await Promise.all(UserCourses.findOne({ userId: decode?.userId}).then(async(course) => {
            if(!course) {
              UserCourses.create({
                userId: decode?.userId,
                courses: [{courseId, courseName}]
              })
            }
            else {
              const allCourses = course?.courses
              const update = {
                userId: decode?.userId,
                modified: Date.now,
                courses: [
                  ...allCourses,
                  {courseId, courseName}
                ]
              }
              UserCourses.findOneAndUpdate({userId: decode?.userId}, {
                $set: update
            }, {
                new: true,
                runValidators: true,
                upsert: true,
                returnOriginal: false,
                returnNewDocument: true
            }).exec()
            }
          }))
        }
      })
      .catch((err) => {
        res.send("error" + err);
      }));
  }
  static async GetAllCourses(req, res) {
    var decode = jwt.verify(req.headers['authorization'], key)
    await UserCourses.find({userId: decode?.userId}).then(courses=>{
      courses && res.json({message: "All User courses Retrieved Successfully", data: courses, total: courses.length})
      !courses && res.json({message: "Unexpected Error"})
    })
  }
  static async GetCourse(req, res) {
    var decode = jwt.verify(req.headers['authorization'], key)
    await UserCourses.findOne({userId: decode?.userId}).then(course=>{
      course && res.json({message: "course Retrieved Successfully", data: course})
      !course && res.json({message: `No registered course found for ${decode?.fullName}`})
    })
  }
  static async DeleteCourse(req, res) {
    const {courseId} = req.params
    var decode = jwt.verify(req.headers['authorization'], key)
    await Promise.all(UserCourses.findOne({userId: decode?.userId, courses:{
      courseId
    }}).then(async (course)=>{
      var updatedCourse = course?.courses.filter(course=>course.courseId!==courseId)
      const update = {
        userId: decode?.userId,
        courses: [
          ...updatedCourse
        ]
      }
      await UserCourses.findOneAndUpdate({userId: decode?.userId}, {
        $set: update
    }, {
        new: true,
        runValidators: true,
        upsert: true,
        returnOriginal: false,
        returnNewDocument: true
    }).exec()
    }))
  }
}
export default UserCourseController;
