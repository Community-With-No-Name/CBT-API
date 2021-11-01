import express from "express";
import Questions from "../models/Questions";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
// const key = process.env.SECRET_KEY || "secret"
class QuestionsController {
  static async AddQuestion(req, res) {
    // res.send(decode)
    const { courseName, courseId, question, answer, options } = req.body;
    await Questions.findOne({ courseName, courseId })
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
        Questions.create(newQuestion).then(() => {
          res.json({ data: newQuestion, message: "Question Added successfully" });
        });
      })
      .catch((err) => {
        res.send("error" + err);
      });
  }
  static async GetAllQuestions(req, res) {
    const {courseId, courseName} = req.params
    await Questions.find({courseId, courseName}).then((questions) => {
      questions &&
        res.json({
          message: "All Questions Retrieved Successfully",
          data: questions,
          total: questions.length,
        });
      !questions && res.json({ message: "Unexpected Error" });
    });
  }
  static async GetQuestion(req, res) {
    const {courseId, questionId} = req.params
    await Questions.findOne({ courseId, questions: {
      questionId
    } }).then((question) => {
      question &&
        res.json({
          message: "Question Retrieved Successfully",
          data: question,
        });
      !question && res.json({ message: "No Question With that ID" });
    });
  }
  static async DeleteQuestion(req, res) {
    const {courseId, questionId} = req.params
    await Questions.findOne({ courseId, questions: {
      questionId
    } }).then((question) => {
      question.questions.remove({questionId})
      .then(()=>{
        res.json({
          message: "Question removed successfully"
        })
      })
    });
  }
  static async DeleteCourse(req, res) {
    const {courseId, questionId} = req.params
    await Promise.all(Questions.findOne({ courseId, questions: {
      questionId
    } }).then(async (question)=>{
      var updatedquestion = question?.questions.filter(question=>question.questionId!==questionId)
      const update = {
        ...question,
        questions: [
          ...updatedquestion
        ]
      }
      await Questions.findOneAndUpdate({courseId}, {
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
export default QuestionsController;
