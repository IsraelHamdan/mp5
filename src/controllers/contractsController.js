import { ContractService } from "../services/contratcService.js";
const service = new ContractService();
/**
 * Controller para buscar contratos relacionados.
 * @param {Object} req - Objeto de requisição.
 * @param {Object} res - Objeto de resposta.
 */

export class ContractController {
  constructor() {}

  GetUserContract(req, res) {
    const { contractId } = req.params;
    const userId = String(req.user.id);

    try {
      const relatedContracts = service.findUserContract(userId, contractId);
      return res.json(relatedContracts);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  GetAllUserContracts(req, res) {
    try {
      const userId = String(req.user?.id);
      if (!userId) {
        throw new Error("Id do usuário não encontrado na requisição");
      }

      const contracts = service.findAllUserContracts(userId);
      if (!contracts) {
        throw new Error(`Erro ao encontrar os contratos desse usuário`);
      }

      return res.json(contracts);
    } catch (err) {
      console.error(`Erro ao buscar contratos do usuário: ${err.message}`);
      return res.status(400).json({
        message: err.message || "Erro interno do servidor",
      });
    }
  }

  createContract(req, res) {
    try {
      const { company, init, end } = req.body;
      const userId = req.user?.id;
      if (!company || !init || !end || !userId) {
        return res
          .status(400)
          .json({ message: "Dados do contrato estão incompletos." });
      }
      const newContract = service.createContract(company, init, end, userId);
      if (!newContract) {
        throw new Error(`Não foi possível criar um contrato`);
      }
      res.status(201).json({ message: "Contrato criado com sucesso" });
    } catch (err) {
      console.error(`Erro ao criar contrato: ${err.message}`);
    }
  }
}
