import Results from "../models/Results";
import jwt from "jsonwebtoken";
const key = process.env.SECRET_KEY || "secret"
class ResultController {
  static async AddResult(req, res) {
    var decode = jwt.verify(req.headers['authorization'], key)
    const { courseId, courseName, score, timeElapsed, timeLeft, date, time } = req.body;
    const newResult = {
      courseId, courseName, score, timeElapsed, timeLeft, date, time, userId: decode?.userId
    };
    decode && decode?.userId && await Results.create(newResult).then(()=>{
      res.json({data: newResult, message: "Result Added Successfully"})
    })
      .catch((err) => {
        res.send("error" + err);
      });
  }
  static async GetAllResults(req, res) {
    var decode = jwt.verify(req.headers['authorization'], key)
     decode && decode?.userId && await Results.find({userId: decode?.userId}).then(result=>{
      result && res.json({message: "All Results Retrieved Successfully", data: result, total: result.length})
      !result && res.json({message: "Unexpected Error"})
    })
  }
  static async GetCourseResults(req, res) {
    const {courseId} = req.params
    var decode = jwt.verify(req.headers['authorization'], key)
    decode && decode?.userId && await Results.find({userId: decode?.userId, courseId}).then(result=>{
      result && res.json({message: `All ${result?.courseName} retrieved successfully`, data: result, total: result.length})
      !result && res.json({message: "Unexpected Error"})
    })
  }
  static async GetLatestResult(req, res) {
    const {courseId} = req.params
    var decode = jwt.verify(req.headers['authorization'], key)
     decode && decode?.userId && await Results.findOne({userId: decode?.userId, courseId}).sort({created: -1}).then(result=>{
      result && res.json({message: `${result[0]?.courseName} result retrieved successfully`, data: result[0]})
    })
  }
  static async DeleteResult(req, res) {
    const {courseId} = req.params
    var decode = jwt.verify(req.headers['authorization'], key)
    await Promise.all(Results.findOneAndDelete({userId: decode?.userId, courseId}).then(async ()=>{
      await Results.find().then(result=>{
        result && res.json({message: "All result Items Retrieved Successfully", data: result})
      !result && res.json({message: "Unexpected Error"})
      })
    }))
  }
}
export default ResultController;
