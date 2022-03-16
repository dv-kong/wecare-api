import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  role: string;

  @Column()
  email: string;

  @Column()
  email_validated: boolean;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  postal_code: string;

  @Column()
  phone_number: string;

  @Column()
  social_security_number: string;

  @Column()
  banned: boolean;

  @Column()
  access_token: string;

  @Column()
  refresh_token: string;
}

