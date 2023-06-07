app.post('/cart', (req, res) => {
    const { productId, quantity } = req.body;
  
    const sql = 'SELECT * FROM products WHERE id = ?';
    const values = [productId];
  
    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error al buscar el producto:', err);
        res.status(500).json({ error: 'Error al buscar el producto' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }
  
      const product = results[0];
  
      // Insertar el producto en la tabla "cart" o "cart_items" junto con la cantidad
      const insertSql = 'INSERT INTO cart_items (productId, quantity) VALUES (?, ?)';
      const insertValues = [product.id, quantity];
  
      connection.query(insertSql, insertValues, (insertErr) => {
        if (insertErr) {
          console.error('Error al agregar el producto al carrito:', insertErr);
          res.status(500).json({ error: 'Error al agregar el producto al carrito' });
          return;
        }
  
        res.json({ message: 'Producto agregado al carrito' });
      });
    });
  });
  
  app.delete('/cart/:productId', (req, res) => {
    const productId = req.params.productId;
  
    const deleteSql = 'DELETE FROM cart_items WHERE productId = ?';
    const deleteValues = [productId];
  
    connection.query(deleteSql, deleteValues, (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error('Error al eliminar el producto del carrito:', deleteErr);
        res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
        return;
      }
  
      if (deleteResult.affectedRows === 0) {
        res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        return;
      }
  
      res.json({ message: 'Producto eliminado del carrito' });
    });
  });
  