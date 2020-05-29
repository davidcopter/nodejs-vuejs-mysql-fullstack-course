'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const items = generateFakeItems(10)
    return queryInterface.bulkInsert('Users', items, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};

function generateFakeItems(count) {
  const items = [];

  for (let i = 0; i < count; i++) {
    const newItem = {
      userName: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      createdAt: faker.date.recent(90),
      updatedAt: new Date()
    };

    items.push(newItem);
  }
  return items;
}
