# 🚀 Grup6: ReMind

## 👥 Membres de l'equip
- Albert Coral
- Jonathan Martin
- Àngel Camps

## 🌐 Web
El nostre projecte està actualment en creació.
[Accedeix al projecte](http://recuerdate.dam.inspedralbes.cat:3672)

## 🎨 Llenguates Utilitzats
- Java
- JavaScript
- Python
- CSS

## 📝 Observacions
Si tens alguna pregunta o comentari sobre el nostre projecte, no dubtis en posar-te en contacte amb nosaltres. Agraïm els teus comentaris i suggeriments per millorar la nostra feina.

---
## 🌐 Desplegament
- **Servidor:** Servidor desplegat al labs.
- **Web:** Web fa connexio amb el servidor al labs.
- **App:** QR a la web per descarregar l'app .
---

## 📄 Documentació del Projecte

Benvinguts a la documentació del projecte! Aquest projecte utilitza diverses tecnologies com Express.js, Socket.IO, MySQL, MongoDB i Python. Aquest README servirà com a punt de partida, amb més detalls disponibles a la carpeta `/doc`.

### 📂 Estructura del Projecte
- **Servidor:** La configuració principal del servidor i els endpoints.
- **Base de Dades:** Connexions i operacions amb MySQL i MongoDB.
- **Python:** Scripts per generar estadístiques.
- **Client:** Codi del frontend i fitxers estàtics.
- **Documentació:** Documentació detallada de totes les classes i mètodes.

### 🚀 Començar
Per començar amb el projecte, seguiu aquests passos:

1. Clonar el repositori amb la comanda `git clone <repository_url>`.
2. Instal·lar les dependències utilitzant `npm install`.
3. Iniciar el servidor amb la comanda `node server.js`.

### 🗂️ Estructura del Codi del Servidor

#### ⚙️ Configuració del Servidor
El servidor es configura utilitzant Express.js, que és un framework web per construir l'API del servidor. També s'utilitzen altres mòduls com:
- `http` per crear un servidor HTTP.
- `socket.io` per a la comunicació en temps real basada en websockets.
- `mysql2/promise` per interactuar amb la base de dades MySQL.
- `body-parser` per parsejar les peticions HTTP amb JSON.
- `nodemailer` per enviar correus electrònics.
- `path` per treballar amb rutes de fitxers.
- `cors` per habilitar CORS (Cross-Origin Resource Sharing).
- `child_process` per treballar amb processos fills, utilitzat per executar scripts Python.
- `fs` per interactuar amb el sistema de fitxers.
- `express-session` per gestionar sessions.

#### 🗄️ Connexió a la Base de Dades
S'utilitza el mòdul `mysql2/promise` per crear una connexió amb la base de dades MySQL. Es configura una connexió de pool per gestionar múltiples connexions de manera eficient.

#### 🔄 Configuració de Socket.IO
Socket.IO s'utilitza per a la comunicació en temps real amb els clients. Quan un client es connecta, el servidor escolta diversos esdeveniments, com ara `solicitarRanking`, per obtenir i enviar dades en temps real.

### 🔗 Endpoints del Servidor

#### 📅 Events de Recordatori
- **Crear Event:** Permet crear un nou esdeveniment enviant les dades a MongoDB.
- **Obtenir Events:** Permet obtenir els esdeveniments d'un usuari específic des de MongoDB.

#### 📊 Estadístiques i Rànquing
- **Desar Dades de Ronda:** Permet desar les dades d'una ronda i generar estadístiques.
- **Desar Rànquing:** Permet desar o actualitzar les dades del rànquing a la base de dades.
- **Obtenir Rànquing:** Permet obtenir el rànquing actual de la base de dades.

#### 🐍 Integració amb Python per Estadístiques
S'utilitza un script Python per generar estadístiques basades en les dades de l'usuari. El servidor executa l'script Python, passa les dades necessàries i recull els resultats.

#### ✉️ Gestió de Contactes
- **Enviar Correu de Contacte:** Permet enviar un correu electrònic de contacte utilitzant el mòdul `nodemailer`.

#### 👪 Gestió Familiar
- **Afegir Elements Familiars:** Permet afegir elements a la col·lecció familiar.
- **Obtenir Elements Familiars:** Permet obtenir els elements familiars d'un usuari específic.
- **Eliminar SubElement:** Permet eliminar un subelement de la col·lecció familiar.
- **Eliminar Element:** Permet eliminar un element de la col·lecció familiar.

#### 🧑‍💼 Gestió d'Usuaris
- **Es fa directament al firebase:** 
