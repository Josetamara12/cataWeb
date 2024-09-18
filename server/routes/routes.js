const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db');

// Ruta para manejar el inicio de sesión
router.post('/login', (req, res) => {
  const { correo, contrasena } = req.body;
  const query = 'SELECT * FROM usuarios WHERE correo = ?';
  
  db.query(query, [correo], (err, results) => {
    if (err) {
      console.error('Error al consultar el usuario:', err);
      return res.status(500).send('Error al procesar la solicitud');
    }

    if (results.length > 0) {
      const user = results[0];

      bcrypt.compare(contrasena, user.contrasena, (err, isMatch) => {
        if (err) {
          console.error('Error al comparar contraseñas:', err);
          return res.status(500).send('Error al procesar la solicitud');
        }

        if (isMatch) {
          res.redirect('/catalogo.html');
        } else {
          res.send('Contraseña incorrecta');
        }
      });
    } else {
      res.send('Correo no registrado');
    }
  });
});

// Ruta para manejar el registro de usuario
router.post('/registro', (req, res) => {
  const { nombre, correo, contrasena, direccion, telefono } = req.body;

  bcrypt.hash(contrasena, 10, (err, hash) => {
    if (err) {
      console.error('Error al encriptar la contraseña:', err);
      return res.status(500).send('Error al procesar la solicitud');
    }

    const query = 'INSERT INTO usuarios (nombre, correo, contrasena, direccion, telefono) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, correo, hash, direccion, telefono], (err, result) => {
      if (err) {
        console.error('Error al registrar el usuario:', err);
        return res.status(500).send('Error al registrar el usuario');
      }
      console.log(`Usuario registrado: ${nombre}, ${correo}`);
      res.redirect('/');
    });
  });
});

module.exports = router;
