import { Response, Request, NextFunction } from "express";
import {
  Controller,
  Middleware,
  Get,
  Post,
  Put,
  Delete,
} from "@overnightjs/core";


// Todo:
// - bidir vs unidir relationships class diagram

@Controller("appointements")
class AppointmentController {

  constructor() {
  }
}

export default AppointmentController;
