module.exports = (sequelize, DataTypes) => {
	const Operation_Type = sequelize.define('Operation_Type', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
	})

	Operation_Type.associate = function(models) {
		Operation_Type.hasMany(models.Operation, {
			foreignKey: 'operationTypeId',
		});
	}

	return Operation_Type
}