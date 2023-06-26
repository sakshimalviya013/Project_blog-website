"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Operation_1 = require("../entities/Operation");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Number@123",
    database: "New_db",
    entities: [User_1.User, Operation_1.Operation],
    synchronize: true,
    logging: true
});
