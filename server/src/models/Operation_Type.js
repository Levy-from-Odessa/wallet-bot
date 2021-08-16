module.exports = (sequelize, DataTypes) => {
	const Operation_Type = sequelize.define('Operation_Type', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
	})

	Operation_Type.associate = function(models) {
		Operation_Type.belongsTo(models.Operation, {
			 through: models.Operation_Type
		});
	}

	return Operation_Type
}