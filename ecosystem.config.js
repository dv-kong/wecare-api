module.exports = {
	app: [
		{
		      name: 'wecare-api',
		      script: './build/app.js',
		      watch: true,
		      force: true,
		      env: {
			      DB_USER: 'root',
			DB_NAME: 'wecare_db',
			DB_HOST: 'localhost',
			DB_PASSWORD: 'Root?P5w?',
			DB_PORT: 3306,
			DB_DRIVER: 'mysql',
			SERVER_PORT: 3000,
			JWT_SECRET: 'helloWorld',	
		      },
		  },
		],
}
