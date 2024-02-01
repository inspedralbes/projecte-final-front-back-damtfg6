const mysql = require('mysql2/promise');
module.exports = { registrarUsuari, getUsuariInfoForLogin };

const connection = mysql.createPool({
    host: "dam.inspedralbes.cat",
    user: "a22albcormad_grup6",
    password: "Pedralbes24",
    database: "a22albcormad_grup6"
});



async function getUsuariInfoForLogin(connection) {
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM Usuaris');
        const usuariosJSON = JSON.stringify(rows);
        console.log("Usuarios encontrados:", usuariosJSON);
        return usuariosJSON;
    } catch (error) {
        console.error('Error al obtener información de usuarios:', error.message);
        throw error;
    }
}


async function registrarUsuari(connection, usuari) {
    try {
        const {nomCogonoms, dni, telefon, correu, contrasenya} = usuari;
        const [result] = await connection.execute(
            'INSERT INTO Usuaris (nomCogonoms, dni, telefon, correu, contrasenya) VALUES (?, ?, ?, ?, ?)',
            [nomCogonoms, dni, telefon, correu, contrasenya]
        );
    } catch (error) {
        console.error('Error al insertar usuari:', error.message);
        throw error;
    }
}