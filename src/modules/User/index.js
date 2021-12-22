import router from './router';
import UserController from './controller';
import User from './model';

/**
 * 
 */

const models = {User};
const controller = new UserController(models)
const routes = router(controller)

export default routes;
