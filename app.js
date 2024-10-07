const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); 

// se cargan las variables de entorno 
dotenv.config(); 

const app = express(); 

// Configurar middleware
app.use(express.json()); // Para procesar JSON
app.use(express.urlencoded({ extended: true })); // Para procesar formularios
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos

// rutas 
const authRoutes = require('./routes/auth');
app.use('/auth', require('./routes/auth'));

// se inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
