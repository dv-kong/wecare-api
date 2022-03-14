import { getCustomRepository } from "typeorm";
import SpecialtyRepository from './repository';
import SpecialtyService from './service';
import SpecialtyController from './controller';

const specialtyRepository = getCustomRepository(SpecialtyRepository);
const specialtyService = new SpecialtyService(specialtyRepository);
const specialtyController = new SpecialtyController(specialtyService);

export { specialtyController };