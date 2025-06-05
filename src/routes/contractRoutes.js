import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/getContract", authenticateToken);
