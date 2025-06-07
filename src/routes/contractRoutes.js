import express from "express";
import { requireRole } from "../middlewares/roleMiddlewere.js";
import { ContractController } from "../controllers/contractsController.js";
const controller = new ContractController();
const router = express.Router();

router.get("/:userId/:contractId/related", (req, res) =>
  controller.GetRelatedContracts(req, res)
);

export default router;
