module.exports = (sequelize, DataTypes) => {
	const Operation = sequelize.define('Operation', {
		price: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		currency: {
			type: DataTypes.STRING,
			allowNull: false
		},
	})

	Operation.associate = function(models) {
		Operation.belongsToMany(models.Tag, {
			through: models.Operation_Tag,
			as: 'tags',
			// foreignKey: 'tag',
		});
		Operation.belongsTo(models.Wallet, {
			through: models.Operation,
			unique: false,
		});
		Operation.belongsTo(models.Operation_Type, {
			 foreignKey: 'operationTypeId',
		});
		Operation.hasOne(models.Currency, {
			 through: models.Operation 
		});
	}
	

	return Operation
}