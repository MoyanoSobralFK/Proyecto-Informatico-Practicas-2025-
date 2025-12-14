/*Antes de empezar:
El frontend es la parte visual de una aplicación con la que interactúa el usuario (botones, menús, etc.), mientras que el backend es 
la parte del servidor que maneja la lógica, los datos y el funcionamiento interno que el usuario no ve, esta api formaria parte de un backend.

Los req (request) son objetos de solicitudes HTPP que llegan al servidor, mientras que res (response) son los objetos que el servidor devuelve.

*PROPIEDADES:

Cuerpo de la solicitud (Request Body): 
Son los datos que el cliente envía al servidor, usualmente en formatos como JSON o XML.	
Se utiliza para enviar datos detallados al servidor, como al crear un nuevo usuario o actualizar un registro. 
La mayoría de las veces se usa con métodos como POST, PUT y PATCH.

Parámetros de ruta (Path Parameters):
Parte de la URL que se utiliza para identificar un recurso específico.
Se usa para especificar qué recurso se está consultando. 
Por ejemplo, en una URL como /usuarios/123, 123 es un parámetro de ruta que identifica al usuario con ese ID.

Parámetros de consulta (Query Parameters):	
Pares clave-valor que se añaden a la URL después del signo de interrogación ?.	
Se utilizan para filtrar, ordenar o paginar los resultados. 
Por ejemplo, ?estado=activo&ordenar=nombre filtraría y ordenaría los resultados.

Encabezados (Headers)	Metadatos de la solicitud, como el tipo de contenido (Content-Type) o las credenciales de autenticación.	
 Proporcionan información adicional sobre la solicitud o la respuesta, como el formato de los datos que se envían o reciben.
*/

const express = require('express'); //Importamos la libreria express para poder usarla.
const app = express();              //Guardamos dentro de app las funciones de express. Cada vez que escribamos app, vamos a estar usando express.


// Asumiendo que la variable 'estudiantes' es un vector que simula una base de datos almacenando objetos, cada uno para un estudiante diferente.
let estudiantes = [
    { id: 1, nombre: "Kundo", curso:"4/1" },
    { id: 2, nombre: "Ciro2", curso:"4/1" },
];

// GET: Obtener todos estudiantes.
app.get('/estudiantes', (req, res) => { //"app.get" define que esta ruta responderá a solicitudes HTTP GET. Mientras que "('/estudiantes')"" es la ruta.
    res.json(estudiantes);              //Se determina que la respuesta tendra los datos de la variable estudiantes.
});


// GET: Obtener un determinado estudiante por ID.   
app.get('/estudiantes/:id', (req, res) => { //La ruta tiene un parametro dinamico (:id), esto quiere decir que 
    const id = parseInt(req.params.id); //Declaramos la variable "id". Con "req.params.id" accedemos al valor del parametro ":id"
                                        //Por ejemplo si tuvieramos la ruta "xxx/:numero" y quisieramos acceder al valor del parametro ":numero" tendriamos que
                                        // usar "req.params.numero". "parseInt"" lo que hace es convertir las cadenas (datos de texto) en numeros enteros (int).

    const ESTUDIANTE = estudiantes.find(e => e.id === id);//Declaramos la variable "ESTUDIANTE" que NO es "estudiantes" aclaro para evitar confuciones.
                                                          //Usamos la funcion javascript "find" que va devoler el valor del primer elemento que cumpla con la condicion.
                                                          //La condicion se ejecuta para cada estudiante (e) de la lista del vector, comparando el id. 
                                                          //de cada uno (e.id) con la variable "id" de arriba que contiene como dijimos el parametro que nesecitamos.
                                                          //Si la condicion se cumple, quiere decir que existe una lista con el id especificado y que por lo                 
    if (ESTUDIANTE) {res.json(ESTUDIANTE);}               //tanto el estudiante existe, por eso "re.json" tendra su informacion (que esta almacenada en "ESTUDIANTE").
    
    else {res.status(404).send('Estudiante no encontrado');} //De lo contrario la variable "ESTUDIANTE" estara vacia y no habra nada que enviar.
});                                                          //Por eso se responde con el codigo 404 (No encontrado) junto al mensaje "Estudiante no encontrado".



// POST: Crear un nuevo estudiante

app.post('/estudiantes', (req, res) => { //"app.post" define que esta ruta responderá a solicitudes HTTP POST. La ruta es la misma.

    const nuevoEstudiante = {           //Creamos un objeto (nuevoEstudiante) para almacenar los datos del estudiante.
        id: estudiantes.length + 1,    //Le asigna un ID que es el número actual de estudiantes más uno,

        nombre: req.body.nombre,       //En el cuerpo (body) de la solicitud (req) estan las claves "nombre" y "curso".
        curso: req.body.curso         //accedemos a ellos con "req.body.*clave*" y los guardamos en elementos del objeto, preferiblemente con el mismo nombre.
    };

    estudiantes.push(nuevoEstudiante);   //Al vector de los estudiantes le agregamos el objeto que contiene el nuevo estudiante.
                                        //".push()" es una funcion de javascript que sirve para agregar elementos a vertores. Estos elementos pueden ser otros vectores, variables o simplemente numeros y cadenas aisladas.
                                      //Ej: vector      = [1,2,3]
                                      //    variable    = "Hola";             vector2 = ["a","b"];
                                      //    vector.push(variable, 5, vector2, Chau)
                                      //    console.log(vector) --> Deberia mostrar en la consola [ 1, 2, 3, 'Hola', 5, 'a', 'b', 'Chau' ]
    res.status(201).json(nuevoEstudiante); //Al final de toda la operacion respondemos con el codigo 201 (Que significa CREATED) y enviamos la variable
});                                        //nuevoEstudiante que es equivalente al recurso/elemento creado.



// PUT: Actualizar un estudiante existente
app.put('/estudiantes/:id', (req, res) => {
    const id = parseInt(req.params.id);   //Lo mismo que antes, accedemos al valor del parametro ":id" y lo guardamos en una variable.

    const i = estudiantes.findIndex(e => e.id === id); //Otra vez lo mismo, buscamos en cada e (estudiante) su id y lo comparamos con la varible
                                                                    //que contiene el valor del parametro.
                                        //Pero en este caso, en vez de usar ".find" que devuelve un valor, usamos ".findIndex" que devuelve la posicion
                                        //de memoria. 
    if (i !== -1) {       //".findIndex" Si no encuentra ningún elemento que cumpla la condición, devuelve -1
                         // Actualizamos los datos del estudiante con los recibidos en el cuerpo de la solicitud
        estudiantes[i] = { 

            nombre: req.body.nombre,       //En el cuerpo (body) de la solicitud (req) estan las claves "nombre" y "curso".
            curso: req.body.curso         //accedemos a ellos con "req.body.*clave*" y los guardamos en elementos del objeto, preferiblemente con el mismo nombre.
        };
        res.status(200).json(estudiantes[i]) //res.json( { mensaje: "Registro actualizado", estudiante: estudiantes[i] } );
    } 

    else {res.status(404).send('Estudiante no encontrado');}    //Si i no es diferente a -1 entonces son iguales, lo que quiere decir que no existe un 
});                                                             //estudiante con el espacio de memoria especificado por el parametro "id" de la url



// DELETE: Eliminar un estudiante
app.delete('/estudiantes/:id', (req, res) => {
    const id = parseInt(req.params.id);      // Otra vez buscamos el valor del parametro "id" de la url lo convertimos en numero y lo guardamos en una variable.
    estudiantes = estudiantes.filter(e => e.id !== id); //Restructuramos el vector de los estudiantes usando la funcion ".filtrer()" que crea un nuevo vector 
                                                        //con todos los elementos que cumplan con la condicion, que en este caso es que su atributo "id"
                                                        //sea diferente a la variable "id"" que contiene el valor del parametro "id" de la url.
                                                        /*EJEMPLO: tenemos un vector con numeros y queremos OTRO que solo tenga los pares:
                                                        const numeros = [1, 2, 3, 4, 5, 6];
                                                        const pares = numeros.filter(numero => numero % 2 == 0);
                                                        console.log(pares); -----> Salida: [2, 4, 6]                                                          */

    res.status(200).send('Estudiante eliminado');       //Enviamos el mensaje "Estudiante elimando" junto al codigo 200 (OK) para decir que se pudo borrar con exito.
});


//Una vez tengamos todo programado.
app.listen(3000, () => console.log('Server en puerto 3000')); //Hace que la aplicación se ejecute en la computadora del desarrollador (Vos)
                                                              //y este disponible en http://localhost:3000. Se da un mensaje en la consola para indicar que
                                                              //el servidor y la api estan andando. 

//PAGINAS INTERESANTES

//1 - https://es.stackoverflow.com/questions/302541/en-que-caso-se-usa-req-params-req-query-y-req-body