import router from './router';
import AppointmentController from './controller';
import Appointment from './model';
// import User from './../user/model';
// import User from '../User/model';

/**
 * Dependancy injection
 */

const models = {
    Appointment,
    // User
};
const controller = new AppointmentController(models);
const routes = router(controller);

export default routes;
