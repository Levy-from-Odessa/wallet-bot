module.exports = (sequelize, DataTypes) => {
	const Wallet = sequelize.define('Wallet', {
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		total: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
	})

	Wallet.associate = function(models) {
		Wallet.hasMany(models.Operation );
	}

	return Wallet
}