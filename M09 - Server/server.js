const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const cors = require('cors');
const session = require('express-session');
const { saveFamilyItems, getFamilyItems } = require('../M06 - Acces a dades/mongoFamiliar.js');
const { eventCreat, buscarEventos } = require('../M06 - Acces a dades/mongoCalendari.js');
const { registrarUsuari, getUsuarisLoginAndroid, registrarTutor, registrarTutoritzacio, verificarUsuario } = require('./scriptSQL.js');
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
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (data) => {
      console.log('message: ' + data.message);
      console.log('sender: ' + data.nomCognoms);
      io.emit('chat message', data);

  });

  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});
//----------------------------------- Events de recoratori -----------------------------------//
//Part Usuari

app.post('/', async function (req, res) {
  console.log(req.body);  // Aquí se imprimirán los datos del evento

  try {
      // Enviar los datos del evento a MongoDB
      await eventCreat(req.body);
      res.send('Evento recibido y guardado en MongoDB!');
  } catch (error) {
      console.error('Error al guardar el evento en MongoDB:', error);
      res.status(500).send('Error al guardar el evento en MongoDB');
  }
});

app.get('/events', async function (req, res) {
  let dniUsuario = req.query.dni;

  try {
      // Buscar los eventos del usuario en MongoDB
      let eventos = await buscarEventos(dniUsuario);
      res.send(eventos);
  } catch (error) {
      console.error('Error al buscar los eventos:', error);
      res.status(500).send('Error al buscar los eventos');
  }
});
//Part Tutor
app.get('/getDniUsuarioVinculado', function(req, res) {
  let dniTutor = req.query.dni;
  let sql = `SELECT u.dni FROM Usuaris u INNER JOIN Familiar f ON u.usuari_identificador = f.usuari_identificador WHERE f.dni = ${dniTutor}`;
  // Ejecuta la consulta y devuelve el resultado
});


//----------------------------------- Stats i Ranking -----------------------------------//


app.post('/stats', async (req, res) => {

  console.log(req.body); 

});

//----------------------------------- CONTACTE WEB -----------------------------------//

app.use(express.json());

app.post("/api/contacte", async (req, res) => {
    const { nom, correu, assumpte, missatge } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "remind.soporte@gmail.com",
            pass: "Pedralbes24",
        }, 
    });

    let mailOptions = {
        from: correu,
        to: "remind.soporte@gmail.com",
        subject: assumpte,
        text: `Nom: ${nom}\nCorreu: ${correu}\nMissatge: ${missatge}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error al enviar el correo");
        } else {
            console.log("Correo enviado: " + info.response);
            res.status(200).send("Correo enviado correctamente");
        }
    });
});

//----------------------------------- FAMILIARS -----------------------------------//


app.post('/family', async (req, res) => {
    try {
        const familyItems = req.body;
        const result = await saveFamilyItems(familyItems);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get('/familyItems', async (req, res) => {
  try {
      const dni = req.query.dni;
      console.log("DNI recibido: " + dni); // Esta línea imprimirá el DNI en la consola del servidor
      const familyItems = await getFamilyItems(dni);
      res.status(200).send(familyItems);
  } catch (error) {
      res.status(500).send(error);
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

//--------------------------------Nova Tutoritzacio------------------------------------//
/*app.post('/registrarTutoritzacio', async (req, res) => {
  try {
    const familiarID = req.query.familiarID;
    const identificador = req.query.identificador;

    console.log("Familiar: ", familiarID);
    console.log("Usuari Identificador: ", identificador);



    // Verificar si existe un usuario con el identificador proporcionado
    const usuarioExistente = await verificarUsuario(connection, identificador);

    if (!usuarioExistente) {
      console.log("El usuario con identificador ", identificador, " no existe.");
      return res.json({ autoritzacio: false, message: 'Error usuari no existeix' });
    }

    // Proceder con la actualización del familiar en la base de datos
    const registrationResult = await registrarTutoritzacio(connection, familiarID, identificador);
    if (registrationResult) {
      res.json({ autoritzacio: true, message: 'Familiar registrado exitosamente' });
    } else {
      res.status(500).json({ autoritzacio: false, message: 'Error al registrar Familiar' });
      console.log("Error al registrar Familiar");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ autoritzacio: false, message: 'Error en el servidor' });
    console.log("Error en el servidor");
  }
});*/


//----------------------------------- TUTO 2 -----------------------------------//


app.post('/registrarTutoritzacio', async (req, res) => {
  try {
    let autoritzacio = { "autoritzacio": false, "usuariTutoritzatData": null };

    const usuaris = JSON.parse(await getUsuarisLoginAndroid(connection));

    const familiarID = req.query.familiarID;
    const identificador = req.query.identificador;

    console.log("Familiar: ", familiarID);
    console.log("Usuari Identificador: ", identificador);

    // Verificar si existe un usuario con el identificador proporcionado
    const usuarioExistente = await verificarUsuario(connection, identificador);

    if (!usuarioExistente) {
      console.log("El usuario con identificador ", identificador, " no existe.");
      return res.json({ autoritzacio: false, message: 'Error usuari no existeix' });
    }

    // Proceder con la actualización del familiar en la base de datos
    const registrationResult = await registrarTutoritzacio(connection, familiarID, identificador);
  

    if (registrationResult) {
      // Verificar si el usuario tiene el rol "usuari"
      autoritzacio.autoritzacio = true;
          for (let i = 0; i < usuaris.length; i++) {
          let identificador2 = parseInt(identificador);
          if (usuaris[i].rol === "usuari" && usuaris[i].usuari_identificador === identificador2) {
              autoritzacio.usuariTutoritzatData = usuaris[i];
              break; 
          }
      }
  
      console.log("Autoritzacio Tutoritzacio: ", autoritzacio);
      res.json(autoritzacio);
    } else {
      res.status(500).json({ autoritzacio: false, message: 'Error al registrar Familiar' });
      console.log("Error al registrar Familiar");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ autoritzacio: false, message: 'Error en el servidor' });
    console.log("Error en el servidor");
  }
});











//-----------------------------------  usuaris Login -----------------------------------//

app.post("/usuarisLogin", function (req, res) {
  const user = req.body;
  let autoritzacio = { "autoritzacio": false, "rol": 'usuari', "userData": null, "usuariTutoritzatData": null };

  // Obtener usuarios de las tablas Usuaris y Familiar
  getUsuarisLoginAndroid(connection).then((usuaris) => {
    usuaris = JSON.parse(usuaris);

    // Buscar a la llista d'usuaris si el usuari i contrasenya coincideixen
    for (let i = 0; i < usuaris.length && !autoritzacio.autoritzacio; i++) {
      if (usuaris[i].dni == user.dni && usuaris[i].contrasenya == user.contrasenya) {
        autoritzacio.autoritzacio = true;
        autoritzacio.userData = usuaris[i];
        //Trobar tutor
        autoritzacio.rol = usuaris[i].rol === "tutor" ? "tutor" : "usuari";

        // Buscar el usuario tutorizado si el usuario actual es un "Tutor"
        if (autoritzacio.rol === "tutor") {
          for (let j = 0; j < usuaris.length; j++) {
            if (usuaris[i].usuari_identificador === usuaris[j].usuari_identificador && usuaris[j].rol === "usuari") {
              autoritzacio.usuariTutoritzatData = usuaris[j];
              break;
            }
          }
        }
        else {
          autoritzacio.usuariTutoritzatData = {};
        }
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