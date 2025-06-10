import express from "express";
import { UserController } from "../controllers/userController.js";

const controller = new UserController();
const router = express.Router();

//${host}/user/
router.get("/", (req, res) => {
  req.log.info("Buscando usuário");
  controller.getUser(req, res);
});

//${host}/user/newUser
router.post("/newUser", (req, res) => {
  controller.createUser(req, res);
});

export default router;
