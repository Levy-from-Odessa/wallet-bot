module.exports = (sequelize, DataTypes) => {
	const Wallet = sequelize.define('Wallet', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
      unique: true
		},
		secret: {
			type: DataTypes.STRING,
			allowNull: false
		},
	})

	Wallet.associate = function(models) {
		Wallet.hasMany(models.Operation, {
			foreignKey: 'walletId',
		});
	}

	return Wallet
}
