import { Response, Request, NextFunction } from "express";
import {
    Controller,
    Middleware,
    Get,
    Post,
    Put,
    Delete,
} from "@overnightjs/core";
import { ISpecialtyService } from "./service";
import { auth } from "../../middlewares";

@Controller("specialties")
class SpecialtyController {
    private specialtyService;
    constructor(specialtyService: ISpecialtyService) {
        this.specialtyService = specialtyService;
    }

    //   @Get()
    //   @Middleware(auth.isAuth)
    //   getAll = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //       let specialtys = await this.specialtyService.getAll();
    //       res.status(200).json(specialtys);
    //     } catch (err) {
    //       next(err);
    //     }
    //   };

    //   @Get(":id")
    //   async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
    //     let id = req.params.id;
    //     try {
    //       const specialty = await this.specialtyService.getById(id);
    //       res.status(200).json(specialty);
    //     } catch (err) {
    //       next(err);
    //     }
    //   }

    // @Middleware(auth.isAuth) // + admin
    @Post("")
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const specialty = await this.specialtyService.create({ ...req.body });
            res.status(201).json({ specialty, message: "Successfully created specialty." });
        } catch (err) {
            next(err);
        }
    };

    @Put("")
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedSpecialty = await this.specialtyService.update({ ...req.body });
            res.status(201).json({ updatedSpecialty, message: "Succesfully updated specialty." });
        } catch (err) {
            next(err);
        }
    };


    //   @Delete(":id")
    //   // @Middleware(auth.isAuth)
    //   deleteById = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //       // if (!specialty) {
    //       //   res.status(404).json({ message: "Specialty does not exists." });
    //       // }
    //       const deletedSpecialty = await this.specialtyService.delete({ ...req.body.id });
    //       console.log(`deletedSpecialty msg ->`, deletedSpecialty);
    //       // deleted ?
    //       res
    //         .status(200)
    //         .json({ message: `Successfully deleted specialty with ID: ${req.body.id}` });
    //     } catch (err) {
    //       next(err);
    //     }
    //   };
}

export default SpecialtyController;

