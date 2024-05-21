const { MongoClient } = require('mongodb');
const uri = "mongodb://admin:Pedralbes24@ac-he8hfqu-shard-00-00.vhfwdze.mongodb.net:27017,ac-he8hfqu-shard-00-01.vhfwdze.mongodb.net:27017,ac-he8hfqu-shard-00-02.vhfwdze.mongodb.net:27017/?ssl=true&replicaSet=atlas-cucatx-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ClusterSintesis"
const client = new MongoClient(uri);

async function guardarActualizarRanking(datosRanking) {
    try {
        await client.connect();
        const collection = client.db("ClusterSintesis").collection("ranking");

        // Buscar si ya existe un documento con el mismo DNI
        const documentoExistente = await collection.findOne({ dni: datosRanking.dni });

        if (documentoExistente) {
            // Comprobar si la nueva puntuación es mayor que la existente
            if (datosRanking.totalScore > documentoExistente.totalScore) {
                // Actualizar el documento con la nueva puntuación más alta
                const resultadoActualizacion = await collection.updateOne(
                    { dni: datosRanking.dni },
                    { $set: { totalScore: datosRanking.totalScore } }
                );
                console.log(`Puntuación actualizada para el DNI: ${datosRanking.dni} con el nuevo totalScore: ${datosRanking.totalScore}`);
            } else {
                console.log(`La puntuación existente (${documentoExistente.totalScore}) es mayor o igual a la nueva puntuación (${datosRanking.totalScore}). No se requiere actualización.`);
            }
        } else {
            // Si no existe, insertar un nuevo documento con la puntuación
            const resultadoInsercion = await collection.insertOne(datosRanking);
            console.log(`Nueva puntuación insertada para el DNI: ${datosRanking.dni} con totalScore: ${datosRanking.totalScore}`);
        }
    } catch (error) {
        console.error("Error al guardar o actualizar los datos de ranking:", error);
    } finally {
        await client.close();
    }
}

async function obtenerRanking() {
    try {
        console.log("Conectando a la base de datos...");
        await client.connect();
        console.log("Conectado a la base de datos, obteniendo colección...");
        const collection = client.db("ClusterSintesis").collection("ranking");

        console.log("Recuperando documentos...");
        const ranking = await collection.find({}).sort({ totalScore: -1 }).toArray();
        console.log("Ranking recuperado con éxito:", ranking);
        return ranking;
    } catch (error) {
        console.error("Error al recuperar el ranking:", error);
        throw error;
    } finally {
        console.log("Cerrando conexión a la base de datos...");
        await client.close();
        console.log("Conexión cerrada.");
    }
}

module.exports = { guardarActualizarRanking, obtenerRanking };
