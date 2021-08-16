
module.exports = (sequelize, DataTypes) => {
	const Currency = sequelize.define('Currency', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
	})

	Currency.associate = function(models) {
		Currency.belongsTo(models.Operation, {
			 through: models.Currency
		});
	}

	return Currency
}