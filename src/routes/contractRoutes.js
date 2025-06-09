import express from "express";
import { ContractController } from "../controllers/contractsController.js";
const controller = new ContractController();
const router = express.Router();

// O id do usuário é extraido do token jwt que veio na requisição!!
router.get("/:contractId/related", (req, res) =>
  controller.GetUserContract(req, res)
);

router.get("/", (req, res) => {
  controller.GetAllUserContracts(req, res);
});
//Somente admins podem criar novos contratos
router.post("/new", (req, res) => {
  controller.createContract(req, res);
});

export default router;
