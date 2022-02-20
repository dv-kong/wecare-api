import dotenv from "dotenv";
dotenv.config();

const env = {
  db_name: process.env.DB_NAME,
  db_port: process.env.DB_PORT || 3050,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_dialect: process.env.DB_DRIVER,
  db_host: process.env.DB_HOST,
  port: process.env.SERVER_PORT,
  jwt_secret: process.env.JWT_SECRET
};

export default env;
