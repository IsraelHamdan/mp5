import express from "express";
import { requireRole } from "../middlewares/roleMiddlewere.js";
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

export default router;
