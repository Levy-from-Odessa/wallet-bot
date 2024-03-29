module.exports = (sequelize, DataTypes) => {
	const Operation = sequelize.define('Operation', {
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
      required: true
		},
	})

	Operation.associate = function(models) {
		Operation.belongsToMany(models.Tag, {
			through: models.Operation_Tag,
			as: 'tags',
		});
		Operation.belongsTo(models.Operation_Type, {
			foreignKey: 'operationTypeId',
			as: 'type',
		});
		Operation.belongsTo(models.Currency, {
			foreignKey: 'currencyId',
			as: 'currency',
		});
		Operation.belongsTo(models.Wallet, {
			foreignKey: 'walletId',
			as: 'wallet',
		});
	}


	return Operation
}
