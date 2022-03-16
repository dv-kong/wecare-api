import UserDTO from "../../src/modules/User/dto";
import { User } from "../../src/modules/User/entity";

// UserDTO
const mockaroo: any = [{
    "id": 1,
    "role": "Construction Expeditor",
    "email": "dbarnsdale0@shop-pro.jp",
    "email_validated": false,
    "password": "TyGWQnI",
    "last_name": "Barnsdale",
    "first_name": "Doralynne",
    "gender": "Male",
    "address": "18 Lawn Point",
    "city": "Poço Verde",
    "postal_code": "49490-000",
    "phone_number": "470-645-8807",
    "social_security_number": "56-351-2013",
    "banned": true,
    "access_token": "3be02966bc0b54a323483cbb38fc2a691340ebf4",
    "refresh_token": "3be02966bc0b54a323483cbb38fc2a691340ebf4"
  }, {
    "id": 2,
    "role": "Estimator",
    "email": "cjodkowski1@tripadvisor.com",
    "email_validated": true,
    "password": "RZYXDao8b4",
    "last_name": "Jodkowski",
    "first_name": "Caralie",
    "gender": "Female",
    "address": "48 Marcy Junction",
    "city": "Carania",
    "postal_code": null,
    "phone_number": "552-559-9903",
    "social_security_number": "02-056-0452",
    "banned": false,
    "access_token": "3be02966bc0b54a323483cbb38fc2a691340ebf4",
    "refresh_token": "3be02966bc0b54a323483cbb38fc2a691340ebf4"
  }, {
    "id": 3,
    "role": "Construction Foreman",
    "email": "hklosser2@fc2.com",
    "email_validated": true,
    "password": "ZnHOPaznIFpW",
    "last_name": "Klosser",
    "first_name": "Hannie",
    "gender": "Female",
    "address": "17240 Derek Trail",
    "city": "Fort Beaufort",
    "postal_code": "5730",
    "phone_number": "100-268-1362",
    "social_security_number": "48-107-0799",
    "banned": false,
    "access_token": "3be02966bc0b54a323483cbb38fc2a691340ebf4",
    "refresh_token": "3be02966bc0b54a323483cbb38fc2a691340ebf4"
  }, {
    "id": 4,
    "role": "Construction Worker",
    "email": "ibull3@bloglines.com",
    "email_validated": false,
    "password": "8F9B1J",
    "last_name": "Bull",
    "first_name": "Iain",
    "gender": "Female",
    "address": "33242 Boyd Road",
    "city": "Pasirsongket Dua",
    "postal_code": null,
    "phone_number": "282-154-8762",
    "social_security_number": "61-985-6368",
    "banned": true,
    "access_token": "3be02966bc0b54a323483cbb38fc2a691340ebf4",
    "refresh_token": "3be02966bc0b54a323483cbb38fc2a691340ebf4"
  }, {
    "id": 5,
    "role": "Engineer",
    "email": "asturley4@pcworld.com",
    "email_validated": false,
    "password": "Jw6Wmc",
    "last_name": "Sturley",
    "first_name": "Anallise",
    "gender": "Female",
    "address": "1308 Del Mar Center",
    "city": "Dongxi",
    "postal_code": null,
    "phone_number": "726-328-1669",
    "social_security_number": "04-928-9745",
    "banned": true,
    "access_token": "3be02966bc0b54a323483cbb38fc2a691340ebf4",
    "refresh_token": "3be02966bc0b54a323483cbb38fc2a691340ebf4"
  }]

  const users: User[] = [];
  
  mockaroo.map(user => {
    //on accedde les proprietes de User directement, sans passer par getters,
    //setters - mauvaise pratique - no encapsulation
    // User entité ORM UserDTO entité 
    //toask: getters et setters dans les classes entities
    const userEntity = new User();
    userEntity.role = user.role;
    userEntity.email = user.email;
    userEntity.email_validated = user.email_validated;
    userEntity.password = user.password;
    userEntity.last_name = user.last_name;
    userEntity.first_name = user.first_name;
    userEntity.gender = user.gender,
    userEntity.address = user.address,
    userEntity.city = user.city;
    userEntity.postal_code = user.postal_code;
    userEntity.phone_number = user.phone_number;
    userEntity.social_security_number = user.social_security_number;
    userEntity.banned = user.banned;
    userEntity.access_token = user.access_token;
    userEntity.refresh_token = user.refresh_token;
    users.push(userEntity);
  });


  export default users;