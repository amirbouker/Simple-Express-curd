'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('User', [{
      email: 'test@gmail.com',
      isBetaMember: false
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
