const express = require('express');
const router = express.Router();

app.get('/api/products-women', (req, res) => {
  // IDs de productos en el orden deseado
  const productIds = [2, 5, 1, 3, 4];
  
  // Generar la cláusula "ORDER BY" basada en los IDs de productos
  const orderByClause = `FIELD(id, ${productIds.join(',')})`;
  
  // Consulta SQL con la cláusula "ORDER BY"
  const query = `SELECT * FROM products WHERE category = 'women' ORDER BY ${orderByClause}`;
  
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los productos para mujeres: ' + error);
      res.status(500).json({ error: 'Error al obtener los productos para mujeres' });
    } else {
      res.json(results);
    }
  });
});


// Ruta para agregar un producto al carrito
router.post('/cart', (req, res) => {
  const product = req.body; // Datos del producto enviado en el cuerpo de la solicitud
  // Lógica para agregar el producto al carrito
  // y enviar una respuesta adecuada
});

module.exports = router;

/*
  Pasar info x url
    const productId = 123;
    const quantity = 2;

    const url = `/checkout?productId=${productId}&quantity=${quantity}`;

  Obtener valores x url
    app.get('/checkout', (req, res) => {
      const productId = req.query.productId;
      const quantity = req.query.quantity;

      // Hacer algo con los valores recibidos

      res.send('Página de checkout');
    });
*/