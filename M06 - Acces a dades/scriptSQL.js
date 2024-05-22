const mysql = require('mysql2/promise');
module.exports = { registrarUsuari, registrarTutor, getUsuarisLoginAndroid, registrarTutoritzacio, verificarUsuario};

const connection = mysql.createPool({
    host: "dam.inspedralbes.cat",
    user: "a22albcormad_grup6",
    password: "Pedralbes24",
    database: "a22albcormad_grup6"
});



async function getUsuarisLoginAndroid(connection) {
    try {
        const [rows, fields] = await connection.execute(`
            SELECT user_id, nomCognoms, dni, telefon, correu, contrasenya, usuari_identificador, 'usuari' as rol FROM Usuaris
            UNION
            SELECT familiar_id, nomCognoms, dni, telefon, correu, contrasenya, usuari_identificador, 'tutor' as rol FROM Familiar
        `);
        const usuariosJSON = JSON.stringify(rows);
        return usuariosJSON;
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
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
        const { nomCognoms, dni, telefon, correu, contrasenya } = familiar;

        const [result] = await connection.execute(
            'INSERT INTO Familiar (nomCognoms, dni, telefon, correu, contrasenya) VALUES (?, ?, ?, ?, ?)',
            [nomCognoms, dni, telefon, correu, contrasenya]
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


async function registrarTutoritzacio(connection, familiarId, usuariIdentificador) {
    try {

        console.log("Familiar ID 1: ", familiarId);
        
        const familiar_id = familiarId;
        const usuari_identificador = usuariIdentificador;

        console.log("Familiar ID 2: ", familiar_id);

        const [result] = await connection.execute(
            'UPDATE Familiar SET usuari_identificador = ? WHERE familiar_id = ?', [usuari_identificador, familiar_id]
        );

        if (result.affectedRows === 1) {
            console.log("Familiar actualizado correctamente");
            return true;
        } else {
            console.log("Error al actualizar el familiar en la base de datos");
            return false;
        }
    } catch (error) {
        console.error('Error al actualizar el familiar:', error.message);
        return false;
    }
}

async function verificarUsuario(connection, usuariIdentificador) {
    try {
        const [rows] = await connection.execute(
            'SELECT COUNT(*) AS count FROM Usuaris WHERE usuari_identificador = ?', [usuariIdentificador]
        );
        const count = rows[0].count;
        return count > 0;
    } catch (error) {
        console.error('Error al verificar usuario:', error.message);
        return false;
    }
}



