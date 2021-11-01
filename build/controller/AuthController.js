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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../models/Users"));
const key = process.env.SECRET_KEY || "secret";
class AuthController {
    static Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            console.log(req.body);
            yield Users_1.default.findOne({ email }).then((user) => {
                if (user) {
                    if (bcryptjs_1.default.compareSync(password, user.password)) {
                        const payload = {
                            userId: user._id,
                            email: user.email,
                            faculty: user.faculty,
                            fullName: user.fullName,
                            department: user.department,
                        };
                        let token = jsonwebtoken_1.default.sign(payload, key);
                        res.json(token);
                    }
                    else {
                        res.json({ message: "Passwords do not match" });
                    }
                }
                else {
                    res.json({
                        message: "User does not exist",
                    });
                }
            });
        });
    }
    static SignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, password, email, faculty, department } = req.body;
            const NewUser = {
                fullName,
                password,
                email,
                faculty,
                department,
            };
            yield Users_1.default.findOne({ email }).then((user) => {
                if (!user) {
                    bcryptjs_1.default.hash(password, 10, (err, hash) => {
                        NewUser.password = hash;
                        const hashedUser = new Users_1.default(NewUser);
                        // Customer.create(customerData).then(() => {
                        hashedUser.save().then(() => {
                            res.json({ message: `${fullName}'s Account Created Successfully` });
                        });
                    });
                }
                else {
                    res.json({
                        message: "An account already exists with that email address"
                    });
                }
            });
        });
    }
    static GetUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var decode = jsonwebtoken_1.default.verify(req.headers['authorization'], key);
            res.json({ user: decode });
        });
    }
}
exports.default = AuthController;
