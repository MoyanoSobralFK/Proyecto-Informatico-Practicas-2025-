//Esto es una API SQL

//IMPORTAR LIBRERIAS

const express = require('express');     //Importamos la libreria express para poder usarla.
const app     = express();              //Guardamos dentro de app las funciones de express. Cada vez que escribamos app, vamos a estar usando express.

const mysql = require('mysql');         //#include <mysql.h> ---> En C (Ponele).

const conexion = mysql.createConexion({     //Establecemos la conexion con la base de datos SQL:
    host: 'localhost',                      // Donde esta la base de datos. En este caso es "localhost", nuestra computadora.
    database: 'escuela'                     // A que base de datos se conecta.
});

//Apartir de aca empiezan los links.

//La sintaxis (forma de escribir) de una api sql, es siempre casi igual:

/*app.metodo('\url' (req, res) =>{

    conexion.query('Consulta SQL aca', (err, rs) => {Respuesta aca});

});                     */

//Conviene repasar un poco las consultas sql antes de ir directo a programar la api. 


//GET - Dar informacion.

//GET (Dar Todos los estudiantes).
app.get('/soyunaurl/estudiantes', (req, res) => { //"app.get" define que esta ruta responderá a solicitudes HTTP GET. Mientras que "('/estudiantes')"" es la ruta.
    
    conexion.query('SELECT * FROM estudientes', (err, rs) =>{ //"conexion.query" dice que vamos a hacer algo en la base de datos. Lo que esta entre las comillas ('') es lo que hacemos.
        res.status(200).json(rs);                             //Lo que tire la base de datos se guarda dentro de "rs".
                                                              //Por eso ponemos que res (La respuesta que le da la API a la pagina web) va a tener el contenido de rs.
    });                                                       //Esto lo hacemos usando .json(). Lo que va entre los parentesis es lo que comparte la API, en este caso rs.
});

//GET (Dar informacion de un estudiante especifico).
app.get('/soyunaurl/estudiantes/:ID', (req, res) =>{
    
    const id = parseInt(req.params.ID);                      //Declaramos la variable "id". Con "req.params.ID" accedemos al valor del parametro ":id".
        	                                                 //Por ejemplo si tuvieramos la ruta "xxx/:numero" y quisieramos acceder al valor del parametro ":numero" tendriamos que
                                                             // usar "req.params.numero". "parseInt"" lo que hace es convertir las cadenas (datos de texto) en numeros enteros (int)
    conexion.query('SELECT * FROM estudiantes WHERE id = ?', [id], (err, rs) =>{// El ? dentro de la consulta seria como el %d de C. Las variables van entre corchetes ([]).
        res.status(200).json(rs)
    });
});

//POST - Poner informacion en la base de datos SQL. "Crear".
app.post('/soyunaurl/estudiantes', (req, res) =>{

    const nombre   = req.body.nombre;              //En el cuerpo (body) de la solicitud (req) estan las claves "nombre" y "curso", osea los valores que queremos poner en la base de datos.
    const apellido = req.body.apellido;            //Accedemos a ellos con "req.body.*clave*" y los guardamos en variables, preferiblemente con el mismo nombre.
    const direccion= req.body.direccion;
    const edad     = parseInt(req.body.edad);      //Aca uso parseInt() porque quiero que la edad sea un numero.
    const curso    = req.body.curso;

    //Una forma mas comoda de hacerlo es:

    const { nombre, apellido, direccion, curso } = req.body;
    const edad =  parseInt(req.body.edad);

    //Ahora ponemos todas las constantes en un vector. Al parecer es obligatorio porque si los ponemos separados no anda ni funciona.

    const vector = [nombre, apellido, direccion, edad, curso];

    conexion.query('INSERT INTO estudiantes VALUES (NULL, ?, ?, ?, ?, ?)', [vector], (err, rs)=>{ //El NULL corresponde al id.
                                                                //La base de datos tiene que estar programada para asignarle uno automaticamente, por eso ponemos NULL.
                                                                                             //En la base de datos iria "AUTO_INCREMENT" en la linea del id.
    if(err){ //Si hay un error.
        res.status(400).send('error al ingresar el estudiante', err);   //Da un codigo de error(400) y un mensaje que contiene el error.
    }     
    
    else{res.status(201).send('Estudiante enviado');}    //Si no hay error, da el codigo 201 y un mensaje que dice que se pudo.                           
    });                                                                                  
});

//PUT - Modificar la informacion de la base de datos SQL.

app.put('/soyunaurl/estudiantes/:id', (req, res) => {
    
    //Como en POST (Crear), tenemos que conseguir los valores del estudiante.

    const {nombre, apellido, direccion, curso} = req.body;
    const edad = parseInt(req.body.edad);

    //Tambien como en uno de los GET, tenemos que conseguir el id.

    const id = parseInt(req.params.id);

    //Y por ultimo una vez mas guardamos todo en un vector.

    const vector = [nombre, apellido, direccion, edad, curso, id];

    conexion.query('UPDATE nombre_tabla SET nombre = ?, apellido = ?, direccion = ?, edad = ?, curso = ? WHERE id = ?', [vector], (err, rs) =>{
        
        if (err) { //Si hay error.
            res.status(400).send('Error al modificar o cambiar el estudiante', error);//Da un codigo de error(400) y un mensaje que contiene el error.
        }

        else{  //Si se pudo hacer
            res.status(200).send('Estudiante alterado') //Si no hay error, da el codigo 201 y un mensaje que dice que se pudo.
        }
    });

    //Algo a tener en cuenta es que el orden en el que ponemos las cosas en el vector es muy importante, tiene que corresponder con el de los ? que estan dentro de la consulta.
    //Si en el vector de que usamos aca hubieramos puesto el id al principio y no al final, En "WHERE id = ?" iria otra cosa como por ejemplo el curso, y eso causaria
    //que el codigo que hicimos no sirva.



});

app.delete('/soyunaurl/:id', (req, res) => {
        
        //Una vez mas necesitamos guardar el valor del parametro id.
        const id = req.params.id;


        //Esta vez como hay un solo ? no necesitamos guardar las cosas en un vector, ponemos directo la constante id y a otra cosa.
        conexion.query('DELETE FROM estudiantes WHERE id = ?', [id], (err, rs) => {

            if (err){
                res.status(400).send('Estas frito, no se pudo hacer ',err);
            }

            else{res.status(200).send('Estas salvado se pudo hacer');}
        });
});

//Una vez tengamos todo programado.

    const puerto = 3000;           //Guardamos en una constante el puerto en el que queremos que se guarde la API.
app.listen (puerto, () => console.log('La api anda, anda y nada en el mar')); //Hace que la aplicación se ejecute en la computadora del desarrollador (Vos)
                                                                             //y este disponible en http://localhost:3000. Se da un mensaje en la consola para indicar que
                                                                            //el servidor y la api estan andando. 