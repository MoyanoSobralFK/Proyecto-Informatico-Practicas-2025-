//Esto es la API SQL.
//req es una abreviacion de request que es pedir o solicitar en ingles, a su vez res es response, respuesta en ingles
//Cada vez que al lado de un enlace ponemos estas palabras, hacemos que este enlace pueda recibir "preguntas" de las paginas web y responderlas.

//Antes de empezar a programar hay que hacer algunas cosas:

//1 - Decir que librerias vamos a usar.
                                        const express =require ('express');
                                        const app     = express();
                                        
                                        const mysql   =require ('mysql');
                                        const cors    =require ('cors');

//2 - Conectar la API a la base de datos.

                const conexion = mysql.createConnection(
                    {  host: 'localhost',          //Donde esta la base de datos (en esta compu).
                    database: 'escuela'}        //Que base de datos.
                );

//3 - Establecer que se puedan compartir archivos estaticos / que no cambian, como videos, audios o videos.

app.use(express.static('public'))

// -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
//                                                      -ENLACES-

//GET: Dar informacion a las paginas.
//No cambia mucho de lo que vimos en base de datos, es mas que nada escribir consultas.

//Escribirmos conexion.query('CONSULTAaca', (err, rs) => {RESPUESTAaca} );.

app.get('/escuela/alumnos', (req, res) =>{           //En este enlace la API
    conexion.query('SELECT * FROM alumnos', (err, rs) => {//Hace una consulta sql para obtener la informacion de los todos los alumnos.
                res.status(200).json(rs);});                 //Y responde a la pagina en formato json y con el codigo 200 OK.
    });


app.get('/escuela/profesores', (res, req)=>{
    conexion.query('SELECT * FROM profesores', (error, repuesta) =>{res.status (200).json(respuesta); });
});

app.get('/escuela/alumnos/:id', (req, res) =>{
    
    const id = parseInt(req.params.id)  //Obtenemos el valor de :id y lo convertimos en numero.
    conexion.query('SELECT * FROM alumnos WHERE id = ?', [id], (error, rs) => {res.status(200).json(rs); });  
    // "?" es como "%d" en C++, osea que en las consultas en lugar de poner ? va a ir el valor de id.
    //Ademas las variables se ponen entre corchetes.
});

app.get('/escuela/profesores/:parametro', (req, res) =>{
    const id = parseInt(req.params.numero)
    conexion.query('SELECT * FROM alumnos WHERE id = ?', [id], (err, rs) => {res.status(200).json(rs); })
});


//POST: Añadir informacion de las paginas a la base de datos.
//Lo mismo, en vez de ser consultas son inserciones, o inserts comodiria el profe.

app.post('/escuela/alumnos', (req, res) =>{
    //Cada req o solicitud tiene un cuerpo en el cual tiene distintas "caracteristicas" con determinados valores.
    //Accedemos a estos valores y los guardamos en variables.
    const nombres       = req.body.nombre;  
    const apellidos     = req.body.appellido;
    const especialidad = req.body.especialidad;  
    const descrip  = req.body.descripcion;



    conexion.query('')

});


