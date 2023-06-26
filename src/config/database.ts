import { DataSource } from "typeorm";
 import { User } from "../entities/User";
import { Operation } from "../entities/Operation";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Number@123",
    database: "New_db",
    entities: [User, Operation],
    synchronize: true,
    logging: true
  });