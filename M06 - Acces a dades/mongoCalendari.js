module.exports = { eventCreat };
const { MongoClient } = require('mongodb');
const uri = "mongodb://admin:Pedralbes24@ac-he8hfqu-shard-00-00.vhfwdze.mongodb.net:27017,ac-he8hfqu-shard-00-01.vhfwdze.mongodb.net:27017,ac-he8hfqu-shard-00-02.vhfwdze.mongodb.net:27017/?ssl=true&replicaSet=atlas-cucatx-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ClusterSintesis"
const client = new MongoClient(uri);

async function eventCreat(nuevosDatos) {
    try {
        await client.connect();
        // Generar un ID único para el evento
        let uniqueId = Math.random().toString(36).substr(2, 9);
        const result = await client.db("ClusterSintesis").collection("eventsCalendari").updateOne(
            { _id: uniqueId },
            { $set: nuevosDatos },
            { upsert: true }
        );
        console.log("Evento actualizado con éxito:", result.upsertedId || result.insertedId);
        return result.upsertedId || result.insertedId;
    } catch (error) {
        console.error("Error al actualizar el evento:", error);
        throw error;
    } finally {
        await client.close();
    }
}
