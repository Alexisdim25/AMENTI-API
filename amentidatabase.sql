CREATE DATABASE amenti;
USE amenti;

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE cart_items (
  productId INT AUTO_INCREMENT PRIMARY KEY,
  quantity VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

SELECT * FROM productos;

INSERT INTO productos (id, nombre, descripcion, precio)
VALUES ('1', 'Producto ejemplo', 'Esta es una descripción de ejemplo', 19.99);
