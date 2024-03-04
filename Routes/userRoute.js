import express from "express";
import { allUsers, singleUser, userDelete, userUpdate } from "../Controllers/userController.js";

const router = express.Router();

router.put("/:id",userUpdate);
router.delete("/:id",userDelete);
router.get("/:id",singleUser);
router.get("/",allUsers);


export default router;