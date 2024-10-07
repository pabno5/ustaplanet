import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Crear la conexión a la base de datos MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ustaplanet',
  port: process.env.DB_PORT || 3306,
});

// Verificamos la conexión al iniciar el servidor
pool.getConnection((err, connection) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Conectado a la base de datos MySQL');
  connection.release();
});

// Obtener todos los usuarios
app.get('/usuarios/:username', (req, res) => {
  const { username } = req.params;
  const query = 'SELECT nombre_usuario, contrasenna FROM usuarios WHERE nombre_usuario = ?';
  pool.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error al obtener usuario:', err);
      return res.status(500).send('Error al obtener usuario');
    }
    if (results.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).send(results[0]);
  });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE nombre_usuario = ? AND contrasenna = ?';
  pool.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error al iniciar sesión:', err);
      return res.status(500).send('Error al iniciar sesión');
    }
    if (results.length === 0) {
      return res.status(401).send('Credenciales incorrectas');
    }
    res.status(200).send('Login exitoso');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});