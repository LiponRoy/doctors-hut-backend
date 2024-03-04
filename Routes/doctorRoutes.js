import express from "express";
import { DoctorDelete, DoctorUpdate, allDoctors, singleDoctor } from "../Controllers/doctorController.js";


const router = express.Router();

router.put("/:id",DoctorUpdate);
router.delete("/:id",DoctorDelete);
router.get("/:id",singleDoctor);
router.get("/",allDoctors);


export default router;