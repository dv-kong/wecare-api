// config
import env from '../config/env';

// services
import JwtService from './jwt';

// services dependencies
import jwt from 'jsonwebtoken';

// instanciate all singleton service with dependency injection
const jwtService = new JwtService(jwt, env.jwt_secret);


// export all libs services
export { jwtService };