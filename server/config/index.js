module.exports = { 
	port: process.env.PORT || 8081,
	db: { 
		database: process.env.DB_NAME || 'wallet',
		user: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASS || '1234',
		options: {
			dialect: process.env.DIALECT || 'postgres',
			host: process.env.HOST || 'localhost',
			// storage: './tabtracker.mysql'
		}
	},
	// authentication: {
	// 	jwtSecret: process.env.JWT_SECRET || 'secret'
	// }
}