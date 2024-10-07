const bcrypt = require('bcryptjs');
const db = require('../models/db');

// Registrar usuario
exports.register = async (req, res) => {
  const { nombre, correo, contrasena, direccion, telefono } = req.body;

  try {
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const sql = 'INSERT INTO usuarios (nombre, correo, contrasena, direccion, telefono) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre, correo, hashedPassword, direccion, telefono], (err, result) => {
      if (err) {
        console.error(err); // Agregar registro del error
        return res.status(500).json({ message: 'Error en el servidor' });
      }
      // Aquí puedes redirigir si estás usando sesiones o un frontend
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  } catch (error) {
    console.error(error); // Agregar registro del error
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;

  const sql = 'SELECT contrasena FROM usuarios WHERE correo = ?';
  db.query(sql, [correo], async (err, results) => {
    if (err) {
      console.error(err); // Agregar registro del error
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length > 0) {
      const validPassword = await bcrypt.compare(contrasena, results[0].contrasena);
      if (validPassword) {
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).json({ message: 'Correo o contraseña incorrectos' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
};
