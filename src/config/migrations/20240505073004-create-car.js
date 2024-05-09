'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marcaCar: {
        type: Sequelize.STRING
      },
      modeloCar: {
        type: Sequelize.STRING
      },
      anoCar: {
        type: Sequelize.INTEGER
      },
      corCar: {
        type: Sequelize.STRING
      },
      tipoCar: {
        type: Sequelize.STRING
      },
      portasCar: {
        type: Sequelize.INTEGER
      },
      transmissionCar: {
        type: Sequelize.STRING
      },
      motorCar: {
        type: Sequelize.STRING
      },
      valorCar: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      imgName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cars');
  }
};