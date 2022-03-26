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

    @Get()
    @Middleware(auth.isAuth)
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let specialties = await this.specialtyService.getAll();
            res.status(200).json(specialties);
        } catch (err) {
            next(err);
        }
    };

    @Post("id")
    // @Middleware(auth.isAuth)
    async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
        const id = req.body.id;
        try {
            const specialty = await this.specialtyService.getById(id);
            res.status(200).json(specialty);
        } catch (err) {
            next(err);
        }
    }

    @Post()
    // @Middleware(auth.isAuth) // step 1: logged in user, step 2: admin rights
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const specialty = await this.specialtyService.create({ ...req.body });
            res.status(201).json(specialty);
        } catch (err) {
            next(err);
        }
    };

    @Put()
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedSpecialty = await this.specialtyService.update({ ...req.body });
            res.status(201).json({ specialty: updatedSpecialty });
        } catch (err) {
            next(err);
        }
    };


    @Delete()
    // @Middleware(auth.isAuth)
    deleteById = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const deletedSpecialty = await this.specialtyService.delete(req.body.id);
            res.status(200).json({ deletedSpecialty, message: `Successfully deleted specialty with ID: ${req.body.id}` });
        } catch (err) {
            next(err);
        }
    };
}

export default SpecialtyController;

