import { Jwt } from "jsonwebtoken";

//TODO: Ask instructor
// -> Extend the Jwt class to include a method to verify a token. ?
class JwtService {
  private jwt: any;
  private secret: string;

  constructor(jwt: any, secret: string) {
    this.jwt = jwt;
    this.secret = secret;
  }

  async decodeToken(token: string) {
    return await this.jwt.verify(token, this.secret);
  }

  async generateToken(data) {
    return await this.jwt.sign(data, this.secret);
  }
  async generateTokenWithExpirationDate(data, expirationDate: string) {
    return await this.jwt.sign(data, this.secret, {
      expiresIn: expirationDate,
    });
  }
}

export default JwtService;
