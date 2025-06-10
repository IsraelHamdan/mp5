import express from "express";
import { UserController } from "../controllers/userController.js";

const controller = new UserController();
const router = express.Router();

router.get("/", (req, res) => {
  req.log.info("Buscando usuário");
  controller.getUser(req, res);
});

export default router;
