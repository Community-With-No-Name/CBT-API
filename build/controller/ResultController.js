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
const Results_1 = __importDefault(require("../models/Results"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key = process.env.SECRET_KEY || "secret";
class ResultController {
    static AddResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var decode = jsonwebtoken_1.default.verify(req.headers['authorization'], key);
            // res.send(decode)
            const { full_name, date, time, reason, phone_number, email } = req.body;
            const newAppointment = {
                full_name, date, time, reason, phone_number, email
            };
            yield Results_1.default.findOne({ date, time })
                .then((appointment) => {
                if (appointment) {
                    console.log(appointment);
                    res.json({ message: "Sorry The selected date and time has been booked" });
                }
                if (!appointment) {
                    // console.log(Appointment)
                    Results_1.default.create(newAppointment).then(() => {
                        res.json({ data: newAppointment, message: "Booking Successful" });
                    });
                }
            })
                .catch((err) => {
                res.send("error" + err);
            });
        });
    }
    static GetAllResults(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageData = Number(req.params.page) * 10;
            const nextPageData = (Number(req.params.page) + 1) * 10;
            yield Results_1.default.find().then(appointment => {
                appointment && res.json({ message: "All Appointments Retrieved Successfully", data: appointment.slice(pageData, nextPageData), total: appointment.length });
                !appointment && res.json({ message: "Unexpected Error" });
            });
        });
    }
    static GetResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Results_1.default.findOne({ _id: req.params.id }).then(appointment => {
                appointment && res.json({ message: "Appointment Retrieved Successfully", data: appointment });
                !appointment && res.json({ message: "No Appointment With that ID" });
            });
        });
    }
    static DeleteResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Results_1.default.findOneAndDelete({ _id: req.params.id }).then(() => __awaiter(this, void 0, void 0, function* () {
                yield Results_1.default.find().then(Appointment => {
                    Appointment && res.json({ message: "All Appointment Items Retrieved Successfully", data: Appointment });
                    !Appointment && res.json({ message: "Unexpected Error" });
                });
            }));
        });
    }
}
exports.default = ResultController;
