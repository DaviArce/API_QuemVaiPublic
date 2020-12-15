const axios = require("axios");

module.exports={
  async verifyCep(cep){
    try{
    const result = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return result.data;
    }
    catch(err){
      return err;
    }
  }
}