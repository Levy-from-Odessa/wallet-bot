module.exports = (sequelize, DataTypes) => {
	const Wallet = sequelize.define('Wallet', {
		price: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		currency: {
			type: DataTypes.STRING,
			allowNull: false
		},
	})

	Wallet.associate = function(models) {
		Wallet.hasMany(models.Operation );
	}

	return Wallet
}