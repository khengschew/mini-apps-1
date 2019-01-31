DROP DATABASE IF EXISTS checkout;

CREATE DATABASE checkout;

USE checkout;

CREATE TABLE checkout (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  address1 VARCHAR(100),
  address2 VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(100),
  zipCode VARCHAR(100),
  phoneNumber VARCHAR(100),
  cc VARCHAR(100),
  expiryDate VARCHAR(100),
  cvv VARCHAR(100),
  billingZip VARCHAR(100)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/

