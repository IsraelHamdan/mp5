import contracts from '../models/contracts.json' with {type: 'json'}

/**
 * Encontra contratos relacionados pelo usuário.
 * @param {string} userId - ID do usuário.
 * @param {string} contractId - ID do contrato.
 * @returns {Array} Lista de contratos relacionados.
 */

export class ContractService {
  findContractByUser (userId, contractId) {
    console.log("🚀 ~ findContractByUser ~ userId, contractId:", userId, contractId)
    const targetContract = contracts.find(contract => contract.contractId === contractId)
  
    if(!targetContract) {
      console.error(`Contrato com ID ${contractId} não encontrado`);
      throw Error(`Contrato com ID ${contractId} não encontrado`)
    }
    
    if(targetContract.userId !== userId) {
      console.error(`Contrato com ID ${contractId} não pertence ao usuário ${userId}`);
      throw new Error(`Contrato com Id ${contractId} não pertence ao usuário`)
    }
    
    return contracts.filter(contract => contract.userId === targetContract.userId)
  }
}

