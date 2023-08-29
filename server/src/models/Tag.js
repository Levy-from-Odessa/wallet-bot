module.exports = (sequelize, DataTypes) => {
	const Tag = sequelize.define('Tag', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		color: {
			type: DataTypes.STRING,
			allowNull: true
		},
	})

	Tag.associate = function(models) {
		Tag.belongsToMany(models.Operation, {
			through: models.Operation_Tag ,
			as: 'operations',
		});
	}

	return Tag
}
