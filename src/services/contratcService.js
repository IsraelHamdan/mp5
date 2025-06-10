import contracts from '../models/contracts.json' with { type: 'json' };
import fs from "fs";
import path from "path";
import validator from 'validator'

export class ContractService {
  findUserContract(userId, contractId) {
    if(!validator.isNumeric(userId) || !validator.isNumeric(contractId)) {
      throw new Error('Erro: id inválido')
    }
    const sanitizedContractId = validator.escape(String(contractId));

    const targetContract = contracts.find(contract => contract.contractId === sanitizedContractId)

    if(!targetContract) {
      console.error(`Contrato com ID ${contractId} não encontrado`);
      throw Error(`Contrato com ID ${contractId} não encontrado`)
    }
    
    if(targetContract.userId !== userId) {
      console.log("🚀 ~ Verificação do id ~ findUserContract ~ userId:", userId)
      
      throw new Error(`Contrato com Id ${contractId} não pertence ao usuário`)
    }
    
    return contracts.filter(contract => contract.userId === targetContract.userId)
  }

  findAllUserContracts(userId) {
    try {
      const sanitizedUserId = validator.escape(String(userId)); 

      const userContracts = contracts.filter(contract => {
        return contract.userId === sanitizedUserId
      })
      if (!userContracts || userContracts.length === 0) {
        throw new Error('NotFoundException:  não encontrado');
      }
      return userContracts;
    } catch(err) {
      console.error(`Erro ao buscar contratos do usuário: ${err.message}`)
      throw err
    }

  }


  createContract(company, init, end, userId) {
    try {
      const newContract = {
        id: String(contracts.length + 1),
        company: company, 
        init: init, 
        end: end,
        userId: userId
      }
      contracts.push(newContract)

      const filePath = path.resolve(__dirname, "../models/contracts.json")
      fs.writeFileSync(filePath, JSON.stringify(contracts, null, 2))
      return newContract
    } catch(err) {
      throw new Error(`Erro ao criar contato: ${err.message}`)
    }

  }

  
}

