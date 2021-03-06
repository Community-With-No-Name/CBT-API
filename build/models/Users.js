"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    faculty: String,
    department: String,
    password: String,
    image: String,
    modified: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
});
const Users = mongoose.model('Users', UsersSchema);
exports.default = Users;
