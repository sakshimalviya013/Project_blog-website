"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const userController_1 = require("./controller/userController");
const operationController_1 = require("./controller/operationController");
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.post('/signin', userController_1.register);
app.post('/login', userController_1.login);
app.get('/operation', operationController_1.getAllOperation);
app.get('/users', userController_1.getAllUser);
app.put('/update-operation', operationController_1.updateOperation);
app.delete('/delete-operation/:operationid', operationController_1.deleteOperation);
app.post('/create-operation', operationController_1.createOperation);
// Routes
// app.get('/',async function (req, res)  {
//   const userRepo = AppDataSource.getRepository(User);
//           const getAllUser = await userRepo.find();
//           res.json(getAllUser);
// let user: User = new User();
// user.name = "Vedansh";
// user.email= "vedansh@gmail.com";
// user.password ="vedansh";
// const userInserted =await userRepo.save(user)
// res.json(userInserted);
// });
database_1.AppDataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
    console.log("Database connection successfully");
})
    .catch((err) => console.log("error connecting database", err));
