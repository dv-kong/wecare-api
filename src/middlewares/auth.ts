import jwt from "jsonwebtoken";
import decode from "jsonwebtoken/decode";
import config from "../config/env";
import User from "../modules/User/model";

const isAuth = async (req, res, next) => {
  // get token, token ok ? 200
  // token invalid ? 40*
  // token expired ? -> use refresh token
  // refresh token invalid ? 40*
  // refresh token expired ? -> send "please log in"
  // refresh token valid ? -> gen new access token
  try {
    let access_token = req.headers.authorization.split(" ")[1];
    console.log(`!! access TOKEN : `, access_token);

    // id, role, iat, exp
    const refresh_token = req.cookies["refresh_token"]; // TODO
    console.log(`!! refresh TOKEN : `, refresh_token);
    // id, role, iat, exp
    // if (!refresh_token)
    // return res.status(401).json("Session expired, please log in.");

    const accessTokenValid = await jwt.verify(access_token, config.jwt_secret);
    // const refreshTokenValid = await jwt.verify(refresh_token, config.jwt_secret);
    console.log(`accessTokenValid`, accessTokenValid);

    let user = await User.findOne({ where: { access_token } }); // Get only once
    // let user = await User.findOne({ where: { access_token, refresh_token } }); // Get only once

    if (!user) return res.status(401).json("Session expired.");

    // await jwt.verify(access_token, config.jwt_secret); //TODO

    req.user = user;
    // TODO? Refactor?
    if (accessTokenValid) {
      res.locals.user = req.user;
      console.log(`res.locals`, res.locals);
    }

    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};
const refreshAccessToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies["refresh_token"]; // TODO

    // let refresh_token = req.body.refresh_token;

    if (!refresh_token) return res.status(404).json("Invalid refresh token");
  } catch (error) {
    return res.status(401).json(error.message);
  }
};
// generate access token from valid refresh token
const generateAccessToken = async (req, res, next) => {};

const isAdmin = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization.split(" ")[1];

    let decoded_token = decode(access_token);

    if (!access_token) return res.status(401).json("Invalid access token");
    if (decoded_token.role !== "admin")
      return res.status(401).json("Invalid rights");

    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};

export { isAuth, refreshAccessToken, isAdmin };
