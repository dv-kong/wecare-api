import {userRouter} from './User'

const routes = {
  // base route ex: http://localhost:3000/users/...
  "/users": userRouter,
  // "/doctors": UserRouter,

  //   "*": 404Router,
};
export default routes;
