-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema wecare_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema wecare_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wecare_db` DEFAULT CHARACTER SET utf8 ;
USE `wecare_db` ;

-- -----------------------------------------------------
-- Table `wecare_db`.`allergy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`allergy` (
  `id` VARCHAR(128) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`appointment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`appointment` (
  `id` VARCHAR(80) NOT NULL,
  `start_time` DATE NOT NULL,
  `endt_time` DATE NOT NULL,
  `validated` TINYINT NOT NULL DEFAULT '0',
  `paid` TINYINT NOT NULL DEFAULT '0',
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`hospital`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`hospital` (
  `id` VARCHAR(80) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(80) NULL DEFAULT NULL,
  `address` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `postal_code` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`service` (
  `id` VARCHAR(80) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`hospital_service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`hospital_service` (
  `hospital_id` VARCHAR(80) NOT NULL,
  `service_id` VARCHAR(80) NOT NULL,
  INDEX `hospital_id_idx` (`hospital_id` ASC) VISIBLE,
  INDEX `service_id_idx` (`service_id` ASC) VISIBLE,
  CONSTRAINT `hospital_id`
    FOREIGN KEY (`hospital_id`)
    REFERENCES `wecare_db`.`hospital` (`id`),
  CONSTRAINT `service_id`
    FOREIGN KEY (`service_id`)
    REFERENCES `wecare_db`.`service` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`medicine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`medicine` (
  `id` VARCHAR(128) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `code` VARCHAR(255) NOT NULL,
  `medicinecol` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `code_UNIQUE` (`code` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`practitioner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`practitioner` (
  `id` VARCHAR(80) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(80) NOT NULL,
  `phone_number` VARCHAR(50) NULL DEFAULT NULL,
  `license_number` VARCHAR(100) NULL DEFAULT NULL,
  `active` TINYINT NOT NULL DEFAULT '0',
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `postal_code` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`practitioner_appointment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`practitioner_appointment` (
  `appointment_id` VARCHAR(80) NOT NULL,
  `practitioner_id` VARCHAR(80) NOT NULL,
  INDEX `appointment_id_idx` (`appointment_id` ASC) VISIBLE,
  INDEX `practitioner_id_idx` (`practitioner_id` ASC) VISIBLE,
  CONSTRAINT `appointment_idfk`
    FOREIGN KEY (`appointment_id`)
    REFERENCES `wecare_db`.`appointment` (`id`),
  CONSTRAINT `practitioner_idfk`
    FOREIGN KEY (`practitioner_id`)
    REFERENCES `wecare_db`.`practitioner` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`schedule` (
  `id` VARCHAR(128) NOT NULL,
  `from` TIMESTAMP NOT NULL,
  `to` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`practitioner_schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`practitioner_schedule` (
  `schedule_id` VARCHAR(80) NOT NULL,
  `practitioner_id` VARCHAR(80) NOT NULL,
  INDEX `practitioner_id_idx` (`practitioner_id` ASC) VISIBLE,
  INDEX `schedule_id_idx` (`schedule_id` ASC) VISIBLE,
  CONSTRAINT `practitioner_id0`
    FOREIGN KEY (`practitioner_id`)
    REFERENCES `wecare_db`.`practitioner` (`id`),
  CONSTRAINT `schedule_id`
    FOREIGN KEY (`schedule_id`)
    REFERENCES `wecare_db`.`schedule` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`specialty`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`specialty` (
  `id` VARCHAR(80) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`practitioner_specialty`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`practitioner_specialty` (
  `specialty_id` VARCHAR(80) NOT NULL,
  `practitioner_id` VARCHAR(80) NOT NULL,
  INDEX `specialty_id_idx` (`specialty_id` ASC) VISIBLE,
  INDEX `practitioner_id_idx` (`practitioner_id` ASC) VISIBLE,
  CONSTRAINT `practitioner_id`
    FOREIGN KEY (`practitioner_id`)
    REFERENCES `wecare_db`.`practitioner` (`id`),
  CONSTRAINT `specialty_id`
    FOREIGN KEY (`specialty_id`)
    REFERENCES `wecare_db`.`specialty` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`prescription`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`prescription` (
  `id` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`report`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`report` (
  `id` VARCHAR(128) NOT NULL,
  `report_name` VARCHAR(255) NOT NULL,
  `report_contents` VARCHAR(2000) NULL DEFAULT NULL,
  `appointment_id` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_appointmentfk`
    FOREIGN KEY (`id`)
    REFERENCES `wecare_db`.`appointment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`service_specialty`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`service_specialty` (
  `specialty_id` VARCHAR(80) NOT NULL,
  `service_id` VARCHAR(80) NOT NULL,
  INDEX `specialty_id_idx` (`specialty_id` ASC) VISIBLE,
  INDEX `service_id_idx` (`service_id` ASC) VISIBLE,
  CONSTRAINT `service_idfk`
    FOREIGN KEY (`service_id`)
    REFERENCES `wecare_db`.`service` (`id`),
  CONSTRAINT `specialty_idfk`
    FOREIGN KEY (`specialty_id`)
    REFERENCES `wecare_db`.`specialty` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`user` (
  `id` VARCHAR(80) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(32) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `social_security_number` VARCHAR(45) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `role` VARCHAR(50) NULL DEFAULT NULL,
  `blacklisted` TINYINT NOT NULL DEFAULT '0',
  `phone_number` VARCHAR(50) NULL DEFAULT NULL,
  `usercol` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`user_appointment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`user_appointment` (
  `appointment_id` VARCHAR(80) NOT NULL,
  `user_id` VARCHAR(80) NOT NULL,
  INDEX `appointment_id_idx` (`appointment_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `appointment_idfk2`
    FOREIGN KEY (`appointment_id`)
    REFERENCES `wecare_db`.`appointment` (`id`),
  CONSTRAINT `user_idfk`
    FOREIGN KEY (`user_id`)
    REFERENCES `wecare_db`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`user_has_allergy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`user_has_allergy` (
  `user_id` VARCHAR(80) NOT NULL,
  `allergy_id` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`user_id`, `allergy_id`),
  INDEX `fk_user_has_allergy_allergy1_idx` (`allergy_id` ASC) VISIBLE,
  INDEX `fk_user_has_allergy_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_allergy_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `wecare_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_allergy_allergy1`
    FOREIGN KEY (`allergy_id`)
    REFERENCES `wecare_db`.`allergy` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`allergy_medicine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`allergy_medicine` (
  `allergy_id` VARCHAR(128) NOT NULL,
  `medicine_id` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`allergy_id`, `medicine_id`),
  INDEX `fk_allergy_has_medicine_medicine1_idx` (`medicine_id` ASC) VISIBLE,
  INDEX `fk_allergy_has_medicine_allergy1_idx` (`allergy_id` ASC) VISIBLE,
  CONSTRAINT `fk_allergy_has_medicine_allergy1`
    FOREIGN KEY (`allergy_id`)
    REFERENCES `wecare_db`.`allergy` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_allergy_has_medicine_medicine1`
    FOREIGN KEY (`medicine_id`)
    REFERENCES `wecare_db`.`medicine` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`prescription_medicine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`prescription_medicine` (
  `medicine_id` VARCHAR(128) NOT NULL,
  `prescription_id` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`medicine_id`, `prescription_id`),
  INDEX `fk_medicine_has_prescription_prescription1_idx` (`prescription_id` ASC) VISIBLE,
  INDEX `fk_medicine_has_prescription_medicine1_idx` (`medicine_id` ASC) VISIBLE,
  CONSTRAINT `fk_medicine_has_prescription_medicine1`
    FOREIGN KEY (`medicine_id`)
    REFERENCES `wecare_db`.`medicine` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_medicine_has_prescription_prescription1`
    FOREIGN KEY (`prescription_id`)
    REFERENCES `wecare_db`.`prescription` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wecare_db`.`appointment_prescription`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wecare_db`.`appointment_prescription` (
  `appointment_id` VARCHAR(125) NOT NULL,
  `prescription_id` VARCHAR(125) NOT NULL,
  INDEX `id_appointmentfk_idx` (`appointment_id` ASC) VISIBLE,
  INDEX `id_prescriptionfk_idx` (`prescription_id` ASC) VISIBLE,
  CONSTRAINT `id_appointmentfk2`
    FOREIGN KEY (`appointment_id`)
    REFERENCES `wecare_db`.`appointment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_prescriptionfk`
    FOREIGN KEY (`prescription_id`)
    REFERENCES `wecare_db`.`prescription` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
