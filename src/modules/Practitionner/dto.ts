export default class PractitionnerDTO {
  private id: string;
  private first_name: string;
  private last_name: string;
  private email: string;
  private password: string;
  private phone_number: string;
  private address: string;
  private city: string;
  private postal_code: string;
  private licence_number: string;
  private status: boolean;

  constructor({
    id,
    first_name,
    last_name,
    email,
    password,
    phone_number,
    address,
    city,
    postal_code,
    licence_number,
    status,
  }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.phone_number = phone_number;
    this.address = address;
    this.city = city;
    this.postal_code = postal_code;
    this.licence_number = licence_number;
    this.status = status;
  }

  public get getId(): string {
    return this.id;
  }
  public set setId(param: string) {
    this.id = param;
  }

  public get getFirstName(): string {
    return this.first_name;
  }
  public set setFirstName(param: string) {
    this.first_name = param;
  }

  public get getLastName(): string {
    return this.last_name;
  }
  public set setLastName(param: string) {
    this.last_name = param;
  }

  public get getEmail(): string {
    return this.email;
  }
  public set setEmail(param: string) {
    this.email = param;
  }

  public get getPassword(): string {
    return this.password;
  }
  public set setPassword(param: string) {
    this.password = param;
  }

  public get getPhoneNumber(): string {
    return this.phone_number;
  }
  public set setPhoneNumber(param: string) {
    this.phone_number = param;
  }

  public get getAddress(): string {
    return this.address;
  }
  public set setAddress(param: string) {
    this.address = param;
  }

  public get getCity(): string {
    return this.city;
  }
  public set setCity(param: string) {
    this.city = param;
  }

  public get getPostalCode(): string {
    return this.postal_code;
  }
  public set setPostalCode(param: string) {
    this.postal_code = param;
  }

  public get getLicenceNumber(): string {
    return this.licence_number;
  }
  public set setLicenceNumber(param: string) {
    this.licence_number = param;
  }

  public get getStatus(): boolean {
    return this.status;
  }
  public set setStatus(param: boolean) {
    this.status = param;
  }
}
