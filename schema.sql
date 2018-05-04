CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT,
    product_name TEXT,
    department_name TEXT,
    price TEXT,
    stock_quantity INT,
    PRIMARY KEY(item_id)

);