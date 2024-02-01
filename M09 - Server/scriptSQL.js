const mysql = require('mysql2/promise');
module.exports = { registrarUsuari, registrarTutor, getUsuariInfoForLogin };

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
        const { nomCognoms, dni, telefon, correu, contrasenya } = usuari;

        const [result] = await connection.execute(
            'INSERT INTO Usuaris (nomCognoms, dni, telefon, correu, contrasenya) VALUES (?, ?, ?, ?, ?)',
            [nomCognoms, dni, telefon, correu, contrasenya]
        );
        
        if (result.affectedRows === 1) {
            console.log("Usuari registrat correctament");
            return true;
        } else {
            console.log("Error al insertar usuari en la base de datos");
            return false;
        }
    } catch (error) {
        console.error('Error al insertar usuari:', error.message);
        return false;
    }
}

async function registrarTutor(connection, familiar) {
    try {
        const { nomCognoms, dni, telefon, correu, contrasenya, usuari_identificador } = familiar;

        const [result] = await connection.execute(
            'INSERT INTO Familiar (nomCognoms, dni, telefon, correu, contrasenya, usuari_identificador) VALUES (?, ?, ?, ?, ?)',
            [nomCognoms, dni, telefon, correu, contrasenya, usuari_identificador]
        );
        
        if (result.affectedRows === 1) {
            console.log("familiar registrat correctament");
            return true;
        } else {
            console.log("Error al insertar familiar en la base de datos");
            return false;
        }
    } catch (error) {
        console.error('Error al insertar familiar:', error.message);
        return false;
    }
}

