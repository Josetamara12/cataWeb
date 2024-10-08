const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); 
const cors = require('cors');

// se cargan las variables de entorno 
dotenv.config(); 

const app = express(); 

// Configurar middleware
app.use(cors()); 
app.use(express.json()); // Para procesar JSON
app.use(express.urlencoded({ extended: true })); // Para procesar formularios
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos

// rutas de autenticacion
const authRoutes = require('./routes/auth');
app.use('/auth',authRoutes);

// Rutas para las páginas HTML
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// se inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
