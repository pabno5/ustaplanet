"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var app = express();
var port = process.env.PORT || 3000; // Cambia el puerto a 3000 para evitar conflictos

// Middleware para habilitar CORS
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json()); // Permite recibir datos JSON en el cuerpo de las solicitudes

// Crear la conexión a la base de datos MySQL
var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ustaplanet',
  port: process.env.DB_PORT || 3306
});

// Verificamos la conexión al iniciar el servidor
pool.getConnection(function (err, connection) {
  if (err) {
    return console.error('Error acquiring client', err.stack); // Si hay un error, lo mostramos
  }
  console.log('Conectado a la base de datos MySQL'); // Si la conexión es exitosa
  connection.release();
});

// Rutas del CRUD

// Obtener todos los usuarios
app.get('/usuarios', function (req, res) {
  pool.query('SELECT * FROM usuarios', function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al obtener usuarios');
    }
    res.json(results); // Devuelve los resultados en formato JSON
  });
});

// Crear un nuevo usuario
app.post('/usuarios', function (req, res) {
  console.log('Solicitud POST recibida:', req.body); // Log para verificar el cuerpo de la solicitud

  var _req$body = req.body,
    nombre_completo_usuario = _req$body.nombre_completo_usuario,
    fecha_nac_usuario = _req$body.fecha_nac_usuario,
    correo = _req$body.correo,
    contrasenna = _req$body.contrasenna,
    nombre_usuario = _req$body.nombre_usuario,
    id_exoplaneta = _req$body.id_exoplaneta,
    id_logro = _req$body.id_logro; // Desestructuramos el cuerpo de la solicitud

  // Validar los datos requeridos
  if (!nombre_completo_usuario || !fecha_nac_usuario || !contrasenna || !nombre_usuario || !correo) {
    console.log('Faltan datos obligatorios'); // Log para verificar la validación
    return res.status(400).send('Faltan datos obligatorios'); // Si faltan datos, respondemos con un error
  }

  // Aquí puedes agregar la lógica para insertar los datos en la base de datos
  var query = 'INSERT INTO usuarios (nombre_completo_usuario, fecha_nac_usuario, correo, contrasenna, nombre_usuario, id_exoplaneta, id_logro) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [nombre_completo_usuario, fecha_nac_usuario, correo, contrasenna, nombre_usuario, id_exoplaneta, id_logro], function (err, result) {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(_objectSpread({
      id: result.insertId
    }, req.body));
  });
});

// Iniciar el servidor
app.listen(port, function () {
  console.log("Servidor corriendo en http://localhost:".concat(port));
});
