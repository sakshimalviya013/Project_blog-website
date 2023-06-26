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
exports.deleteOperation = exports.updateOperation = exports.getAllOperation = exports.createOperation = void 0;
const Operation_1 = require("../entities/Operation");
const database_1 = require("../config/database");
const User_1 = require("../entities/User");
const createOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operationRepo = database_1.AppDataSource.getRepository(Operation_1.Operation);
        const userRepo = database_1.AppDataSource.getRepository(User_1.User);
        const { userid, image, description, title } = req.body;
        if (userid === undefined) {
            throw new Error("Userid is NULL ");
        }
        let user = yield userRepo.findOne({ where: { userid: userid } });
        if (user === null)
            throw new Error("User not found");
        let operation = new Operation_1.Operation();
        operation.image = image;
        operation.description = description;
        operation.createdAt = new Date();
        operation.title = title;
        operation.user = user;
        const createdOperation = yield operationRepo.save(operation);
        res.status(200).json({
            success: true,
            createdOperation,
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error
        });
    }
});
exports.createOperation = createOperation;
const getAllOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operationRepo = database_1.AppDataSource.getRepository(Operation_1.Operation);
        const getAllOperation = yield operationRepo.find();
        res.status(200).json({
            success: true,
            getAllOperation
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error
        });
    }
});
exports.getAllOperation = getAllOperation;
const updateOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operationRepo = database_1.AppDataSource.getRepository(Operation_1.Operation);
        const { operationid, title, image, description } = req.body;
        const operation = yield operationRepo.findOne({ where: { operationid: operationid } });
        if (operation === null) {
            throw new Error(`No post found`);
        }
        operation.title = title;
        operation.image = image;
        operation.description = description;
        // operation.createdAt = new Date();
        const updatedOperation = yield operationRepo.save(operation);
        res.status(200).json({
            success: true,
            updatedOperation
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error
        });
    }
});
exports.updateOperation = updateOperation;
const deleteOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operationRepo = database_1.AppDataSource.getRepository(Operation_1.Operation);
        const { operationid } = req.params;
        yield operationRepo.delete(operationid);
        res.status(200).json({
            success: true,
            message: " Post deleted successfully"
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error
        });
    }
});
exports.deleteOperation = deleteOperation;
