import express from "express";
import { allUsers, singleUser, userDelete, userUpdate } from "../Controllers/userController.js";
import { isAuth } from "../auth/verifytoken.js";



const router = express.Router();

router.put("/:id",userUpdate);
router.delete("/:id",userDelete);
router.get("/:id",singleUser);
router.get("/",isAuth,allUsers);


export default router;