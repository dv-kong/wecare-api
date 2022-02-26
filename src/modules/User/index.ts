import { getCustomRepository } from "typeorm";
import UserRepository from './repository';
import UserService from './service';
import UserController from './controller';
import { jwtService } from '../../libs';

const userRepository = getCustomRepository(UserRepository);
const userService = new UserService(userRepository);
const userController = new UserController(userService, jwtService);

export { userController };


// // import User from './model';
// // import Appointment from '../Appointment/model';

// import User from './entity.js';
// import UserRepository from './repository';
// import UserService from './service';
// import UserController from './controller';
// import UserRouter from './router';
// import { jwtService } from '../../libs';


// // dependencies injection

// // const models = {User, Appointment}; // IoD for Unit Testing
// // const controller = new UserController(models)
// // const routes = router(controller)


// const userRepository = new UserRepository(User);
// const userService = new UserService(userRepository);
// const userController = new UserController(userService, jwtService);
// const userRouter = new UserRouter(userController);

// export { userRouter, User };
