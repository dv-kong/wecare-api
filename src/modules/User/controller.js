import JwtService from "../../libs/jwt";

class UserController {
  // To function correctly, this controller needs the supplied models
  // dependency = what a class need to function

  constructor(userService, jwtService) {
    this.userService = userService;
    this.jwtService = jwtService; //TODO Need to be refactored
  }

  /**
   * @login takes a request, a response and a next function
   * @param
   */

  getUserById = async (req, res, next) => {

    try {
      const user = await this.userService.findById(req, res);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {

      const user = req.body;
      console.log(`USER `, user);
      await this.userService.findByEmail(user.email);
      await this.userService.create(user);

      return res.status(200).json({
        message: "Successfully created an account with email: " + user.email,
      });

    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    const credentials = req.body;

    try {
      
      const user = await this.userService.login(credentials);
      
      // const access_token = this.jwtService.sign(
      //   { id: user.id, role: user.role },
      //   env.jwt_secret,
      //   {
      //     expiresIn: "5m", // TODO: change to 15m
      //   }
      // );

      // const refresh_token = this.jwtService.sign(
      //   { id: user.id, role: user.role },
      //   env.jwt_secret,
      //   {
      //     expiresIn: "7d",
      //   }
      // );

      // const jwtTokens = {
      //    access_token,
      //    refresh_token
      // }

      const token = await this.jwtService.generateToken({ id: user.id, role: user.role });
      res.cookie('refresh_token', token, {expiresIn: '1d', httpOnly: true});

      // await this.userService.update(jwtTokens, email);

      // Store refresh token and his properties in cookie with "refresh_token" key
      // The HttpOnly flag is an additional flag included in a Set-Cookie HTTP response header. It is used to prevent a Cross-Site Scripting exploit from gaining access to the session cookie and hijacking the victim's session.
      // res.cookie("refresh_token", refresh_token, {
      //   expiresIn: "7d",
      //   httpOnly: true,
      // });

      res.status(200).json({
        access_token: user.access_token,
        // refresh_token: user.refresh_token,
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        postal_code: user.postal_code,
        city: user.city,
        address: user.address,
        social_security_number: user.social_security_number,
        phone_number: user.phone_number,
      });
    } catch (error) {
      next(error);
    }
  };


  updateUser = async (req, res, next) => {
    console.log("TODO: Update user");
  };


  //   silentUserAuthentication = async (req, res, next) => {
  //     const { access_token,refresh_token } = req.body;

  // // jwtService.verify(access_token, )
  //     try {
  //       const docs = await this.#models;
  //       await res.status(200).json({ message: "GET ALL USERS FROM DB" });
  //     } catch (err) {
  //       next(err);
  //     }
  //   };

  deleteUser = async (req, res, next) => {
    const { id } = req.body;
    
    try {
     await this.userService.deleteUser(id);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
