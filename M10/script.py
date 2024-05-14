import sys
import json
import matplotlib.pyplot as plt
from datetime import datetime
from pymongo import MongoClient
import base64
import os

# Recibir los datos desde stdin
partidas = json.load(sys.stdin)

# Ordenar las partidas por fecha
partidas.sort(key=lambda x: datetime.strptime(x['fecha'], '%Y/%m/%d %H:%M:%S'))

# Extraer las fechas y las puntuaciones
fechas = [partida['fecha'] for partida in partidas]
puntuaciones = [partida['totalScore'] for partida in partidas]

# Crear una figura más grande
plt.figure(figsize=(14, 12))

# Generar el gráfico
plt.plot(fechas, puntuaciones)
plt.xlabel('Fecha')
plt.ylabel('Puntuación')
plt.title('Progreso del usuario')

# Rotar las fechas en el eje x
plt.xticks(rotation='vertical')

# Guardar el gráfico en un archivo
nombre_archivo = 'progreso.png'
plt.savefig(nombre_archivo)

# Leer la imagen y codificarla en base64
with open(nombre_archivo, 'rb') as f:
    imagen_base64 = base64.b64encode(f.read()).decode('utf-8')

# Conectar a MongoDB
client = MongoClient('mongodb://admin:Pedralbes24@ac-he8hfqu-shard-00-00.vhfwdze.mongodb.net:27017,ac-he8hfqu-shard-00-01.vhfwdze.mongodb.net:27017,ac-he8hfqu-shard-00-02.vhfwdze.mongodb.net:27017/?ssl=true&replicaSet=atlas-cucatx-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ClusterSintesis')
db = client['ClusterSintesis']
collection = db['grafics']

# Obtener el DNI del usuario
dni_usuario = partidas[0]['dni']

# Comprobar si ya existe un gráfico para este DNI
grafico_existente = collection.find_one({'dni': dni_usuario})

if grafico_existente:
    # Si existe, actualizarlo
    collection.update_one({'dni': dni_usuario}, {'$set': {'imagen': imagen_base64}})
else:
    # Si no existe, insertar uno nuevo
    collection.insert_one({'dni': dni_usuario, 'imagen': imagen_base64})

# Eliminar el archivo de imagen
os.remove(nombre_archivo)
