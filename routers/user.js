
import { Router } from "express"

import userController from "../controllers/userController.js"

let db 

db=userController

const routerUsers = Router();

routerUsers.get('/', db.getAllUsers);

routerUsers.get('/:id', db.getUser);

routerUsers.get('/email', db.findByEmail);

routerUsers.post ('/', db.createUser);

routerUsers.delete('/:id', db.deleteUser);

routerUsers.put('/:id', db.updateUser);

export default routerUsers;