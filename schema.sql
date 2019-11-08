DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id int NOT NULL AUTO_INCREMENT,
  product_name varchar(255) NOT NULL,
  department_name varchar(255) NOT NULL,
  price int NOT NULL,
  stock_quantity int NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Computer', 'Electronic', '700', '10');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Purse', 'Women', '70', '15');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Diapers', 'Baby', '40', '20');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Flower Pot', 'Garden', '8', '10');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Ring', 'Jewelry', '200', '2');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('iPhone Charger', 'Electronic', '20', '5');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Size 4 Socks', 'Clothes', '10', '6');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Underwear', 'Clothes', '10', '5');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Old Yeller', 'Book', '15', '1');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Backpack', 'School', '35', '10');