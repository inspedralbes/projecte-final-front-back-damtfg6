const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
    logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});

exports.createUser = functions.firestore
    .document('users/{userId}')
    .onCreate(async (snap, context) => {
        const newValue = snap.data();

        // Generar un identificador único de 5 caracteres
        let identificador = Math.floor(Math.random() * 100000).toString().padStart(5, '0');

        // Verificar si el identificador ya existe
        let existe = await admin.firestore().collection('users')
            .where('usuari_identificador', '==', identificador)
            .get();

        // Si el identificador ya existe, generamos uno nuevo hasta que sea único
        while (!existe.empty) {
            identificador = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
            existe = await admin.firestore().collection('users')
                .where('usuari_identificador', '==', identificador)
                .get();
        }

        // Asignar el identificador generado al nuevo usuario
        return snap.ref.update({ usuari_identificador: identificador });
    });
