installation & setup:

install node.js
cd to app folder
npm init -y
npm i express mongoose dotenv
npm i nodemon -D

create server.js into backend folder 

update package.json file:
"scripts": {
    "start" : "node backend/server.js",
    "dev" : "nodemon backend/server"
  },
"type": "module"

npm i jsonwebtoken bcryptjs cors cookie-parser cloudinary


 //themes:  [
      // "light",
      // {
      //   black : {
      //     primary : "rgb(29,155,240)",
      //     secondary : "rgb(24,24,24)"
      //   }
      // }
    // ],