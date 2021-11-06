import UserCourses from "../models/UserCourses";
import jwt from "jsonwebtoken";
const key = process.env.SECRET_KEY || "secret"
class UserCourseController {
  static async AddCourse(req, res) {
    var decode = jwt.verify(req.headers['authorization'], key)
    const { courseId, courseName } = req.body;
    console.log(courseId, courseName)
   const courses = await UserCourses.findOne({ userId: decode?.userId })
const coursesToCheck = courses?.courses
    const checkCourses = coursesToCheck?.filter(i => i.courseName===courseName).length
console.log(checkCourses)
    if(checkCourses) res.json({ error: `${courseName} already exists` });
          if (!checkCourses){
          const course = await UserCourses.findOne({ userId: decode?.userId})
if(!course){UserCourses.create({
                userId: decode?.userId,
                courses: [{courseId, courseName}]
              })
res.json({message: "Course reg successful"})
}
              
            if(course) {
              const allCourses = course?.courses
              
              const update = {
                userId: decode?.userId,
                modified: Date.now(),
                courses: [
                  ...allCourses,
                  {courseId, courseName}
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
            }).exec().then(() => res.json({message: "Course Added Successfully"}) )
            }
          // .catch((err) => {
          //   res.send("error" + err);
          // })
        }
  }
  static async GetAllCourses(req, res) {
    var decode = jwt.verify(req.headers['authorization'], key)
    await UserCourses.findOne({userId: decode?.userId}).then(courses=>{
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
