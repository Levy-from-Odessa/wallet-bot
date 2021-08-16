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
		Operation.hasOne(models.Operation_Type, {
			 through: models.Operation 
		});
		Operation.hasOne(models.Currency, {
			 through: models.Operation 
		});
	}

	return Operation
}