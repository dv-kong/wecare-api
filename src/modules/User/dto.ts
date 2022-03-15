// class UserDTO {

//     public id;
//     public email;
//     constructor({ id, email }: { id: number, email: string }) {
//         this.id = id;
//         this.email = email;
//     }

// }

// export default UserDTO;

// Legacy code

// DTO
// A data transfer object (DTO) is an object that carries data between processes.
// You can use this technique to facilitate communication between two systems (like an API and your server) without potentially exposing sensitive information.
// https://www.okta.com/identity-101/dto/#:~:text=A%20data%20transfer%20object%20(DTO,for%20people%20with%20programming%20backgrounds.

// What will be sent back to the front
// Filter the data that will be sent to client
// Helps hide the data

class UserDTO {
  map(arg0: (user: UserDTO) => UserDTO) {
    throw new Error("Method not implemented.");
  }
  //TODO (A REFACTO) Rendre private les propriétés et déclarer des getters et setters
  public id: number;
  public email: string;
  public email_validated: boolean;
  public password: string;
  public first_name: string;
  public last_name: string;
  public postal_code: string;
  public address: string;
  public gender: string;
  public city: string;
  public phone_number: string;
  public social_security_number: string;
  public banned: boolean;
  public access_token: string;
  public refresh_token: string;

  constructor({
    id,
    email,
    password,
    first_name,
    last_name,
    postal_code,
    address,
    gender,
    city,
    phone_number,
    social_security_number,
    banned,
    access_token,
    refresh_token,
  }: UserDTO) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.postal_code = postal_code;
    this.address = address;
    this.gender = gender;
    this.city = city;
    this.phone_number = phone_number;
    this.social_security_number = social_security_number;
    this.banned = banned;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
}

export default UserDTO;
