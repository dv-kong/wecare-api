import router from './router';
import UserController from './controller';
import User from './model';
import Appointment from '../Appointment/model';
/**
 * 
 */

const models = {User, Appointment};
const controller = new UserController(models)
const routes = router(controller)

export default routes;
