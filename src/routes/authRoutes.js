import express from "express";
import { AuthController } from "../controllers/authController.js";
const router = express.Router();
const auth = new AuthController();

router.post("/login", (req, res) => {
  auth.login(req, res);
});
export default router;
