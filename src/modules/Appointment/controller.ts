// import ApiError from "../../helpers/ApiError"
import User from "./model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../config/env";
class AppointmentController {
  #models;
  constructor(models) {
    this.#models = models;
  }
  /**
   * @login takes a request, a response and a next function
   * @param
   */

  //TODO DEFINE APPOINTMENT CONTROLLER CODE

}

export default AppointmentController;
