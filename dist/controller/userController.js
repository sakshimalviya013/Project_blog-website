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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.login = exports.register = void 0;
const User_1 = require("../entities/User");
const database_1 = require("../config/database");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepo = database_1.AppDataSource.getRepository(User_1.User);
        const { name, email, password, cpassword } = req.body;
        if (password !== cpassword) {
            throw new Error("Password incorrect ");
        }
        let user = new User_1.User();
        user.email = email;
        user.password = password;
        user.name = name;
        const registerUser = yield userRepo.save(user);
        res.status(200).json({
            success: true,
            registerUser
        });
    }
    catch (error) {
        res.status(403).json({
            success: false,
            message: error
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepo = database_1.AppDataSource.getRepository(User_1.User);
        const { email, password } = req.body;
        const loginUser = yield userRepo.find({ where: { email: email, password: password } });
        if (loginUser.length === 0) {
            throw new Error("Password/Email is Incorrect");
        }
        res.status(200).json({
            success: true,
            loginUser
        });
    }
    catch (error) {
        res.status(403).json({
            success: false,
            message: error
        });
    }
});
exports.login = login;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepo = database_1.AppDataSource.getRepository(User_1.User);
        const getAllUser = yield userRepo.find({ relations: { operations: true } });
        res.status(200).json({
            success: true,
            getAllUser
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error
        });
    }
});
exports.getAllUser = getAllUser;
