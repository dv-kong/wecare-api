import { Secret, Jwt } from "jsonwebtoken";

class JwtService {
    private jwt: Jwt;
    private secret: Secret;

    constructor(jwt: Jwt, secret: Secret) {
        this.jwt = jwt;
        this.secret = secret;
    }

    async decodeToken(token:string) {
        return await this.jwt.verify(token, this.secret);
    }

    async generateToken(data) {
        return await this.jwt.sign(data, this.secret);
    }
}

export default JwtService;