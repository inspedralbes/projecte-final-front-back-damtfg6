const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const {registrarUsuari, getUsuarisLoginAndroid, registrarTutor} = require('./scriptSQL.js');
const app = express();
const PORT = 3672;

const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
  console.log("Servidor => " + PORT);
});

app.use(cors({
  origin: function (origin, callback) {
      return callback(null, true);
  }
}));
app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createPool({
  host: "dam.inspedralbes.cat",
  user: "a22albcormad_grup6",
  password: "Pedralbes24",
  database: "a22albcormad_grup6"
});

//----------------------------------- CHAT -----------------------------------//
const io = socketIO(httpServer, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
});
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
    let autoritzacio = { "autoritzacio": false, "rol": 'usuari', "userData": null, "usuariTutoritzatData": null };

    // Obtener usuarios de las tablas Usuaris y Familiar
    getUsuarisLoginAndroid(connection).then((usuaris) => {
        usuaris = JSON.parse(usuaris);

        // Buscar en la lista combinada de usuarios
        for (let i = 0; i < usuaris.length && !autoritzacio.autoritzacio; i++) {
            if (usuaris[i].dni == user.dni && usuaris[i].contrasenya == user.contrasenya) {
                autoritzacio.autoritzacio = true;
                autoritzacio.userData = usuaris[i];
                autoritzacio.rol = usuaris[i].rol === "usuari" ? "usuari" : (usuaris[i].usuari_identificador ? "tutor" : "usuari");

                // Buscar el usuario tutorizado si el usuario actual es un "Tutor"
                if (autoritzacio.rol === "tutor") {
                    for (let j = 0; j < usuaris.length; j++) {
                        if (usuaris[i].usuari_identificador === usuaris[j].usuari_identificador && usuaris[j].rol === "usuari") {
                            autoritzacio.usuariTutoritzatData = usuaris[j];
                            break; // Terminar la búsqueda una vez que se haya encontrado el usuario tutorizado
                        }
                    }
                }

                req.session.nombre = user.nomUsuari;
            }
        }

        console.log("Autoritzacio Login: ", autoritzacio);
        res.json(autoritzacio);
    }).catch((error) => {
        console.error('Error al obtener usuarios:', error.message);
        res.status(500).json({ "error": "Error al obtener usuarios" });
    });
});

var history = require('connect-history-api-fallback')
const staticFileMiddleware = express.static('../dist');
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);