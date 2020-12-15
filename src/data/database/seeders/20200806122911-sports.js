'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('sports', [{
        name: 'Futebol',
        description:'Esporte onde tem que chutar a bola no gol'
      }], {});
      //Basket
      await queryInterface.bulkInsert('sports', [{
        name: 'Basquetebol',
        description:'Jogar a bola no cesto'
      }], {});
      //Voley
      await queryInterface.bulkInsert('sports', [{
        name: 'Voleibol',
        description:'Jogar a bola no chão do adversario'
      }], {});
      //Corrida
      await queryInterface.bulkInsert('sports', [{
        name: 'Caminhada',
        description:'Caminhar'
      }], {});
      //Ciclismo
      await queryInterface.bulkInsert('sports', [{
        name: 'Ciclismo',
        description:'Ciclismo é a prática de se usar uma bicicleta, seja como esporte ou forma de locomoção.'
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkDelete('sports', null, {});
     
  }
};
