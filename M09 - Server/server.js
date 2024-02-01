// Importació de mòduls
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

// Configuració de l'aplicació Express
const app = express();
const PORT = 3582;

// Creació del servidor HTTP utilitzant Express
const httpServer = http.createServer(app);

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

app.post('/registrar', async (req, res) => {
    try {
      const newUser = req.body;
      const registrationResult = await registrarUsuari(connection, newUser);
      if (registrationResult) {
        res.json({ success: true, message: 'Usuario registrado exitosamente' });
      } else {
        res.status(500).json({ success: false, message: 'Error al registrar usuario' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  });

  app.get('/usuaris', async (req, res) => {
    try {
      const usuariosJSON = await getUsuariInfoForLogin(connection);
      const usuarios = JSON.parse(usuariosJSON);
      res.json(usuarios);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener la lista de usuarios');
    }
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