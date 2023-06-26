import "reflect-metadata"
import express from 'express';
import { AppDataSource } from "./config/database";
import { register, login, getAllUser } from "./controller/userController";
import * as dotenv from "dotenv";
import { createOperation, deleteOperation, getAllOperation, updateOperation } from "./controller/operationController";


const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes

app.post('/signin', register);
app.post('/login', login);
app.get('/operation', getAllOperation);
app.get('/users', getAllUser);
app.put('/update-operation', updateOperation)
app.delete('/delete-operation/:operationid', deleteOperation)
app.post('/create-operation', createOperation);


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



AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  console.log("Database connection successfully")
})
.catch((err)=> console.log("error connecting database",err));





