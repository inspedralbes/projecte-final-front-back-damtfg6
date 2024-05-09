module.exports = { saveFamilyItems, getFamilyItems};
const { MongoClient } = require('mongodb');
const uri = "mongodb://admin:Pedralbes24@ac-he8hfqu-shard-00-00.vhfwdze.mongodb.net:27017,ac-he8hfqu-shard-00-01.vhfwdze.mongodb.net:27017,ac-he8hfqu-shard-00-02.vhfwdze.mongodb.net:27017/?ssl=true&replicaSet=atlas-cucatx-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ClusterSintesis"
const client = new MongoClient(uri);

async function saveFamilyItems(familyItems) {
    try {
        await client.connect();
        const collection = client.db("ClusterSintesis").collection("itemsFamiliars");

        // Buscar un documento existente con el mismo DNI
        const existingDocument = await collection.findOne({ dni: familyItems.dni });

        if (existingDocument) {
            // Si el documento existe, iterar sobre todos los items
            for (let i = 0; i < familyItems.items.length; i++) {
                const existingItemIndex = existingDocument.items.findIndex(item => item.itemTitle === familyItems.items[i].itemTitle);

                if (existingItemIndex !== -1) {
                    // Si el item existe, añadir todos los nuevos subitems al item existente
                    const newSubItems = familyItems.items[i].subItemList.filter(newSubItem => 
                        !existingDocument.items[existingItemIndex].subItemList.some(existingSubItem => 
                            existingSubItem.subItemTitle === newSubItem.subItemTitle && 
                            existingSubItem.subItemDesc === newSubItem.subItemDesc &&
                            existingSubItem.subItemImageBase64 === newSubItem.subItemImageBase64
                        )
                    );

                    if (newSubItems.length > 0) {
                        const result = await collection.updateOne(
                            { dni: familyItems.dni, "items.itemTitle": familyItems.items[i].itemTitle },
                            { $push: { "items.$.subItemList": { $each: newSubItems } } }
                        );
                        console.log("Nuevos subitems añadidos al item existente con éxito:", result.upsertedId || result.insertedId);
                    } else {
                        console.log("Los subitems ya existen, no se añaden.");
                    }
                } else {
                    // Si el item no existe, añadir el nuevo item
                    const result = await collection.updateOne(
                        { dni: familyItems.dni },
                        { $push: { items: { $each: [familyItems.items[i]] } } }
                    );
                    console.log("Nuevo item añadido con éxito:", result.upsertedId || result.insertedId);
                }
            }
        } else {
            // Si el documento no existe, insertar uno nuevo
            const result = await collection.insertOne(familyItems);
            console.log("Items de la familia guardados con éxito:", result.insertedId);
        }
    } catch (error) {
        console.error("Error al guardar los items de la familia:", error);
        throw error;
    }
}
async function getFamilyItems(dni) {
    try {
        await client.connect();
        const collection = client.db("ClusterSintesis").collection("itemsFamiliars");

        // Buscar un documento con el DNI especificado
        const document = await collection.findOne({ dni: dni });

        if (document) {
            // Si el documento existe, devolver los items y subitems
            return document.items;
        } else {
            // Si el documento no existe, devolver un mensaje de error
            throw new Error("No se encontraron items para el DNI especificado");
        }
    } catch (error) {
        console.error("Error al obtener los items de la familia:", error);
        throw error;
    }
}

