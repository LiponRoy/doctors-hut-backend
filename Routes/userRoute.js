import express from "express";
import { allUsers, singleUser, userDelete, userUpdate } from "../Controllers/userController.js";
import { isAuth, restrictArea } from "../auth/verifytoken.js";



const router = express.Router();

router.put("/:id",userUpdate);
router.delete("/:id",userDelete);
router.get("/:id",singleUser);
router.get("/",isAuth,restrictArea(["patient"]), allUsers);


export default router;