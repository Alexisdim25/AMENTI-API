const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configurar las rutas aquí

app.listen(4000, () => {
  console.log('Servidor escuchando en el puerto 4000');
});

app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, rows) => {
      if (err) {
        console.error('Error al obtener los usuarios:', err);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
        return;
      }
      res.json(rows);
    });
});

  app.post('/registro', (req, res) => {
    const { nombre, correo, contraseña } = req.body;
  
    // Validar los datos del formulario si es necesario
  
    // Crear una consulta SQL para insertar el nuevo usuario en la base de datos
    const sql = 'INSERT INTO users (nombre, correo, contraseña) VALUES (?, ?, ?)';
    const values = [nombre, correo, contraseña];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al registrar el usuario:', err);
        res.status(500).json({ error: 'Error al registrar el usuario' });
        return;
      }
      res.json({ message: 'Usuario registrado exitosamente' });
    });
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { correo, contraseña } = req.body;
  
    // Validar los datos del formulario si es necesario
  
    // Crear una consulta SQL para buscar el usuario en la base de datos
    const sql = 'SELECT * FROM users WHERE correo = ? AND contraseña = ?';
    const values = [correo, contraseña];
  
    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error al autenticar el usuario:', err);
        res.status(500).json({ error: 'Error al autenticar el usuario' });
        return;
      }
  
      if (results.length === 0) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }
  
      res.json({ message: 'Inicio de sesión exitoso' });
    });
  });

app.get('/logout', (req, res) => {
  // Realiza cualquier lógica necesaria para cerrar la sesión del usuario
  // Esto puede incluir eliminar la información de la sesión o el token de autenticación
  req.session.destroy();
  res.json({ message: 'Cierre de sesión exitoso' });
});

