app.post('/contact', (req, res) => {
    const { nombre, apellidos, asunto } = req.body;
  
    const sql = 'INSERT INTO contactos (nombre, apellidos, asunto) VALUES (?, ?, ?)';
    const values = [nombre, apellidos, asunto];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al guardar la solicitud de contacto:', err);
        res.status(500).json({ error: 'Error al guardar la solicitud de contacto' });
        return;
      }
  
      res.json({ message: 'Solicitud de contacto enviada correctamente' });
    });
  });
  