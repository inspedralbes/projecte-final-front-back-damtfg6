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
app.post('/enviarMensaje', async (req, res) => {
const { nomCognoms, message } = req.body;
console.log(`Recibida solicitud de ${nomCognoms} para enviar mensaje: ${message}`);
for (let userId in users) {
  users[userId].emit('receive_message', { nomCognoms, message });
}
console.log(`Mensaje enviado con éxito a todos los usuarios`);

res.send({ success: true });
});
let users = [];

io.on('connection', (socket) => {

socket.on('user_connected', (userId) => {
    users[userId] = socket;
});

socket.on('send_message', (data) => {
    if (users[data.receiverId]) {
        users[data.receiverId].emit('receive_message', data);
    }
});

socket.on('disconnect', () => {
    for (let userId in users) {
        if (users[userId] == socket) {
            delete users[userId];
            break;
        }
    }
});
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
    let autoritzacio = { "autoritzacio": false, "rol": 'usuari', "userData": null };


    getUsuarisLoginAndroid(connection).then((usuaris) => {
        usuaris = JSON.parse(usuaris);

        let i;
        for (i = 0; i < usuaris.length && !autoritzacio.autoritzacio; i++) {
            if (usuaris[i].dni == user.dni && usuaris[i].contrasenya == user.contrasenya) {
                autoritzacio.autoritzacio = true;
                autoritzacio.rol = usuaris[i].rol === "usuari" ? "usuari" : (usuaris[i].usuari_identificador ? "tutor" : "usuari");
                autoritzacio.userData = usuaris[i];
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