// Importació de mòduls
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const {registrarUsuari, getUsuarisLoginAndroid, registrarTutor} = require('./scriptSQL.js');

// Configuració de l'aplicació Express
const app = express();
const PORT = 3672;

// Creació del servidor HTTP utilitzant Express
const httpServer = http.createServer(app);

// Configuració de la connexió a la base de dades

const connection = mysql.createPool({
  host: "dam.inspedralbes.cat",
  user: "a22albcormad_grup6",
  password: "Pedralbes24",
  database: "a22albcormad_grup6"
});

// Configuració de Socket.IO 
const io = socketIO(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Configuració de CORS 
app.use(cors({
    origin: function (origin, callback) {
        return callback(null, true);
    }
}));

// Configuració de la sessió d'Express
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Configuració de body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//----------------------------------- Usuaris Reigister i Login -----------------------------------//

app.post('/registrarUsuari', async (req, res) => {
    try {
      const newUser = req.body;
      const registrationResult = await registrarUsuari(connection, newUser);
      if (registrationResult) {
        res.json({ autoritzacio: true, message: 'Usuario registrado exitosamente' });
      } else {
        res.status(500).json({ autoritzacio: false, message: 'Error al registrar usuario' });
        console.log("Error al registrar usuario")
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ autoritzacio: false, message: 'Error en el servidor' });
      console.log("Error en el servidor")
    }
  });

  app.post('/registrarTutor', async (req, res) => {
    try {
      const newFamiliar = req.body;
      const registrationResult = await registrarTutor(connection, newFamiliar);
      if (registrationResult) {
        res.json({ autoritzacio: true, message: 'Familiar registrado exitosamente' });
      } else {
        res.status(500).json({ autoritzacio: false, message: 'Error al registrar Familiar' });
        console.log("Error al registrar Familiar")
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ autoritzacio: false, message: 'Error en el servidor' });
      console.log("Error en el servidor")
    }
  });

  app.post("/usuarisLogin", function (req, res) {
    const user = req.body;
    let usuariTrobat = false;
    let autoritzacio = { "autoritzacio": false };

    // Obtener usuarios de las tablas Usuaris y Familiar
    getUsuarisLoginAndroid(connection).then((usuaris) => {
        usuaris = JSON.parse(usuaris);

        // Buscar en la lista combinada de usuarios
        for (var i = 0; i < usuaris.length && !usuariTrobat; i++) {
            if (usuaris[i].dni == user.dni && usuaris[i].contrasenya == user.contrasenya) {
                usuariTrobat = true;
                req.session.nombre = user.nomUsuari;
            }
        }
        autoritzacio.autoritzacio = usuariTrobat;
        console.log("Autoritzacio Login: ", autoritzacio);
        res.json(autoritzacio);
    }).catch((error) => {
        console.error('Error al obtener usuarios:', error.message);
        res.json(autoritzacio);
    });
});






// Inici del servidor HTTP
httpServer.listen(PORT, () => {
    console.log("Servidor => " + PORT);
});

var history = require('connect-history-api-fallback')
const staticFileMiddleware = express.static('../dist');
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);