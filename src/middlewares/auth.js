import jwt from "jsonwebtoken";
import decode from "jsonwebtoken/decode";
import config from "../config/env";
import User from "../modules/User/model";

const isAuth = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization.split(" ")[1];
    const refresh_token = req.cookies["refresh_token"];

    if (!refresh_token)
      return res.status(401).json("Session expired, please log in.");

    let user = await User.findOne({ where: { access_token, refresh_token } });

    if (!user) return res.status(401).json("Session expired.");

    await jwt.verify(access_token, config.jwt_secret);

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};
const refreshAccess = async (req, res, next) => {
  try {
    let refresh_token = req.cookies["refresh_token"];

    if (!refresh_token) return res.status(404).json("Invalid refresh token");

  } catch (error) {
    return res.status(401).json(error.message);

  }
};

const isAdmin = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization.split(" ")[1];

    let decoded_token = decode(access_token);

    if (!access_token) 
      return res.status(401).json("Invalid access token");
    if (decoded_token.role !== "admin")
      return res.status(401).json("Invalid rights");

    next();
  } catch (error) {
    return res.status(401).json(error.message);

  }
};

export { isAuth, refreshAccess, isAdmin };
