//Esto es una API tipo rest.

express = require('express')    // #include <express>
app = express()                 //Cada vez que escribamos app vamos a estar usando las funciones de express.

let usuarios = [ 
        {id: 1, nombre: "elcocinador666", contraseña: "xxx"},
        {id: 1, nombre: "mrfurio",        contraseña: "contraseña"},
                      ];

app.post('/url/usuario', (req, res) => {       //La ruta "/url/usuario" aceptara peticiones POST.
        
        const nuevoUsuario {                   //Declaramos un vector:
                id: usuarios.length+1,         //Su valor en id va a ser el la cantidad de elementos de "usuarios" + 1
         
         //La peticion (req) tiene un cuerpo (body), en el cual se almacena lo que se quiere poner en la API.
         //Cada peticion esta dividida en partes, una por cada tipo de informacion.

                nombre: req.body.nombre,           //Guardamos la parte "nombre" del cuerpo de la peticion en nombre.
                contraseña: req.body.contraseña   
            };

            usuarios = usuarios.push(nuevoUsuario) //Agrega el  vector usuario al objeto "usuarios".

            res.json(201).json.(nuevoUsuario); //La api le dice a la pagina que esta todo bien y le muestra como quedo el usuario nuevo.
        });