const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Currencies", deps: []
 * createTable() => "Operation_Types", deps: []
 * createTable() => "Tags", deps: []
 * createTable() => "Wallets", deps: []
 * createTable() => "Operations", deps: [Currencies, Operation_Types, Wallets]
 * createTable() => "Operation_Tags", deps: [Operations, Tags]
 *
 */

const info = {
  revision: 1,
  name: "noname",
  created: "2023-10-12T22:26:05.821Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Currencies",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Operation_Types",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Tags",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        color: { type: Sequelize.STRING, field: "color", allowNull: true },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Wallets",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          unique: true,
          allowNull: false,
        },
        secret: { type: Sequelize.STRING, field: "secret", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Operations",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          field: "price",
          required: true,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        currencyId: {
          type: Sequelize.INTEGER,
          field: "currencyId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Currencies", key: "id" },
          allowNull: true,
        },
        operationTypeId: {
          type: Sequelize.INTEGER,
          field: "operationTypeId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Operation_Types", key: "id" },
          allowNull: true,
        },
        walletId: {
          type: Sequelize.INTEGER,
          field: "walletId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Wallets", key: "id" },
          allowNull: true,
          defaultValue: 1,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Operation_Tags",
      {
        OperationId: {
          type: Sequelize.INTEGER,
          field: "OperationId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Operations", key: "id" },
          primaryKey: true,
        },
        TagId: {
          type: Sequelize.INTEGER,
          field: "TagId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Tags", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Currencies", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Operations", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Operation_Tags", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Operation_Types", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Tags", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Wallets", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
