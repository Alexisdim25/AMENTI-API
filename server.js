const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 400;

// Configuración de la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'amentiweb',
  database: 'amenti'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

app.use(express.json());

app.get('/api/products-women', (req, res) => {
  const query = 'SELECT * FROM products WHERE category = "women"';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los productos para mujeres: ' + error);
      res.status(500).json({ error: 'Error al obtener los productos para mujeres' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/cart', (req, res) => {
  const productId = req.body.productId;

  const sql = 'INSERT INTO cart_items (productId) VALUES (?)';
  const values = [productId];

  connection.query(sql, values, (err) => {
    if (err) {
      console.error('Error al agregar el producto al carrito:', err);
      res.status(500).json({ error: 'Error al agregar el producto al carrito' });
      return;
    }

    res.json({ message: 'Producto agregado al carrito' });
  });
});

app.use(express.urlencoded({ extended: true }));

app.post('/guardar-datos', (req, res) => {
  // Aquí puedes acceder a los datos del formulario a través de req.body
  const nombre = req.body.firstname;
  const apellidos = req.body.lastname;
  const asunto = req.body.subject;

   // Insertar los datos en la base de datos
   const query = 'INSERT INTO tabla_datos (nombre, apellidos, asunto) VALUES (?, ?, ?)';
   connection.query(query, [nombre, apellidos, asunto], (err, result) => {
     if (err) {
       console.error('Error al guardar los datos en la base de datos:', err);
       res.send('Error al guardar los datos en la base de datos');
     } else {
       console.log('Datos guardados correctamente en la base de datos');
       res.send('Datos del formulario recibidos y guardados correctamente');
     }})

  // Aquí puedes realizar las operaciones necesarias con los datos recibidos

  // Por ejemplo, puedes enviar una respuesta al cliente
  res.send('Datos del formulario recibidos correctamente');
});

app.listen(port, () => {
  console.log('Servidor escuchando en el puerto ' + port);
});
