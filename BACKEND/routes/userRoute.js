import express from "express"

import { create, getUsers, userByID, update, deleteUser } from "../controllers/userController.js"

const route = express.Router();

route.post("/user", create)
route.get("/users", getUsers)
route.get("/user/:id", userByID)
route.put("/update/user/:id", update)
route.delete("/delete/user/:id", deleteUser)

export default route