## Base para la creación de interfaces.

Este proyecto utiliza como stack:

- Node.js
- Express js
- Handelbar

Luego de descargar el proyecto se debe:

### Instalación de Nodejs

- Instalar Nodejs: Para ello se debe primero instalar NVM. 

`‌curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh`

Para  que les funcione se debe salir de la consola e ingresar nuevamente, o simplemente ejecutar:

`export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`

Luego deberán instalar la última versión estable de Node, para ello:

`nvm install 12.15`


### Instalación de Express

Luego de instalar nodejs,  será necesario que instalen  express.
Este es un pequeño framework que permite la creación de aplicaciones web y API's. Es equivalente a Sinatra (en Ruby), y su principal característica es el manejo de las rutas.
Pueden encontrar la documentación en https://expressjs.com/es/:

`npm install -g express`

### Instalación de PM2


Finalmente  se debe instalar PM2, explicativo que es un servidor de aplicaciones para Nodejs. Es el equivalente a Unicorn en Ruby. Podrán encontrar la documentación en https://pm2.keymetrics.io/.
Para instalarlo deben ejecutar:

`npm install pm2 -g`

### Ejecución

Finalmente para ejecutar  la aplicación deberán cargar las dependencias. Para ello debe ingresar a la cartera se du proyecto y ejecutar:
 `npm install`
 
 Si quieren ejecutar la aplicación   pueden:
 
 `npm start`
 
 Esto permitirá que toda modificación que se haga, transpire los cambios  a los archivos que se configuraron en el webpack
 
### Levantar la aplicación 
 
Para levantar lo primero es revisar el archivo ecosistema.config.js, que encontrarán en la raíz del proyecto. En este podrán definir el nombre y el número de servidores  PM2 a levantar. La recomendación es 1 por cada core.

Para trabajar en modo developer

`sh config/init_developer.sh`
	
Para trabajar en modo productivo
	
`sh config/init.sh`
