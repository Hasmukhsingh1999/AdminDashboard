import express from "express";
import { getAllUser, getDashboardStats, getUser } from "../controllers/general.js";

const router = express.Router();

router.get("/user/get-allUser",getAllUser);

router.get("/user/:id", getUser);


router.get("/dashboard",getDashboardStats)
export default router;
