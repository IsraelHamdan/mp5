import { ContractService } from "../services/contratcService.js";
const service = new ContractService();
/**
 * Controller para buscar contratos relacionados.
 * @param {Object} req - Objeto de requisição.
 * @param {Object} res - Objeto de resposta.
 */

export class ContractController {
  constructor() {}
  GetRelatedContracts(req, res) {
    const { userId, contractId } = req.params;
    console.log(`
      Id do usuário vindo da requisição ${userId} \n 
      Id do contrato vindo da requisição ${contractId}
    `);
    try {
      const relatedContracts = service.findContractByUser(userId, contractId);
      return res.json(relatedContracts);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}
