import sys
import json
import matplotlib.pyplot as plt
from datetime import datetime
from pymongo import MongoClient
import base64
import os
import numpy as np
from collections import defaultdict

# Recibir los datos desde stdin
partidas = json.load(sys.stdin)

# Agrupar las partidas por fecha y seleccionar la partida con la puntuación más alta de cada día
partidas_por_fecha = defaultdict(list)
for partida in partidas:
    fecha = partida['fecha'].split(' ')[0]
    partidas_por_fecha[fecha].append(partida)

mejores_partidas = []
for fecha, partidas in partidas_por_fecha.items():
    mejor_partida = max(partidas, key=lambda x: x['totalScore'])
    mejores_partidas.append(mejor_partida)

# Ordenar las mejores partidas por fecha
mejores_partidas.sort(key=lambda x: datetime.strptime(x['fecha'].split(' ')[0], '%Y/%m/%d'))

# Extraer las fechas y las puntuaciones de las mejores partidas
fechas = [partida['fecha'].split(' ')[0] for partida in mejores_partidas]
puntuaciones = [partida['totalScore'] for partida in mejores_partidas]

# Crear una figura más grande
plt.figure(figsize=(8, 6))

# Generar el gráfico
plt.plot(fechas, puntuaciones)
plt.xlabel('Fecha')
plt.ylabel('Puntuació total')
plt.title('Pregrés del jugador en el temps')

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

# Extraer las preguntas falladas por ronda
falladas_ronda1 = [partida['ronda1']['fallades'] for partida in mejores_partidas]
falladas_ronda2 = [partida['ronda2']['fallades'] for partida in mejores_partidas]

# Generar el gráfico para la ronda 1
plt.figure(figsize=(8, 6))
plt.plot(fechas, falladas_ronda1)
plt.xlabel('Fecha')
plt.ylabel('Preguntas Falladas')
plt.title('Preguntas Falladas en la Ronda 1')
plt.xticks(rotation='vertical')

# Asegurarse de que las marcas del eje y sean números enteros
plt.yticks(np.arange(min(falladas_ronda1), max(falladas_ronda1)+1, 1.0))

nombre_archivo_ronda1 = 'falladas_ronda1.png'
plt.savefig(nombre_archivo_ronda1)

# Leer la imagen y codificarla en base64
with open(nombre_archivo_ronda1, 'rb') as f:
    imagen_base64_ronda1 = base64.b64encode(f.read()).decode('utf-8')

# Comprobar si ya existe un gráfico para este DNI
grafico_existente = collection.find_one({'dni': dni_usuario, 'imagen': imagen_base64_ronda1})

if grafico_existente:
    # Si existe, actualizarlo
    collection.update_one({'dni': dni_usuario, 'imagen': imagen_base64_ronda1}, {'$set': {'imagen': imagen_base64_ronda1}})
else:
    # Si no existe, insertar uno nuevo
    collection.insert_one({'dni': dni_usuario, 'imagen': imagen_base64_ronda1})

# Eliminar el archivo de imagen
os.remove(nombre_archivo_ronda1)

# Generar el gráfico para la ronda 2
plt.figure(figsize=(8, 6))
plt.plot(fechas, falladas_ronda2)
plt.xlabel('Fecha')
plt.ylabel('Preguntas Falladas')
plt.title('Preguntas Falladas en la Ronda 2')
plt.xticks(rotation='vertical')

# Asegurarse de que las marcas del eje y sean números enteros
plt.yticks(np.arange(min(falladas_ronda2), max(falladas_ronda2)+1, 1.0))

nombre_archivo_ronda2 = 'falladas_ronda2.png'
plt.savefig(nombre_archivo_ronda2)

# Leer la imagen y codificarla en base64
with open(nombre_archivo_ronda2, 'rb') as f:
    imagen_base64_ronda2 = base64.b64encode(f.read()).decode('utf-8')

# Comprobar si ya existe un gráfico para este DNI
grafico_existente = collection.find_one({'dni': dni_usuario, 'imagen': imagen_base64_ronda2})

if grafico_existente:
    # Si existe, actualizarlo
    collection.update_one({'dni': dni_usuario, 'imagen': imagen_base64_ronda2}, {'$set': {'imagen': imagen_base64_ronda2}})
else:
    # Si no existe, insertar uno nuevo
    collection.insert_one({'dni': dni_usuario, 'imagen': imagen_base64_ronda2})

# Eliminar el archivo de imagen
os.remove(nombre_archivo_ronda2)