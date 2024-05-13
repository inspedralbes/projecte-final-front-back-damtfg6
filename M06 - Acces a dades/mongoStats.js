const { MongoClient } = require('mongodb');
const uri = "mongodb://admin:Pedralbes24@ac-he8hfqu-shard-00-00.vhfwdze.mongodb.net:27017,ac-he8hfqu-shard-00-01.vhfwdze.mongodb.net:27017,ac-he8hfqu-shard-00-02.vhfwdze.mongodb.net:27017/?ssl=true&replicaSet=atlas-cucatx-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ClusterSintesis"
const client = new MongoClient(uri);

async function saveRoundData(roundData) {
    try {
        await client.connect();
        const collection = client.db("ClusterSintesis").collection("stats");

        // Insertar los datos de las rondas
        const result = await collection.insertOne(roundData);
        console.log("Datos de las rondas guardados con éxito:", result.insertedId);
    } catch (error) {
        console.error("Error al guardar los datos de las rondas:", error);
        throw error;
    }
}

async function getStatistics(dni) {
    try {
        await client.connect();
        const collection = client.db("ClusterSintesis").collection("stats");

        // Buscar todas las partidas para el DNI proporcionado
        const result = await collection.find({ dni: dni }).toArray();
        
        console.log("Partidas recuperadas con éxito para el DNI:", dni);
        return result;
    } catch (error) {
        console.error("Error al recuperar las partidas:", error);
        throw error;
    }
}

module.exports = { saveRoundData, getStatistics };
