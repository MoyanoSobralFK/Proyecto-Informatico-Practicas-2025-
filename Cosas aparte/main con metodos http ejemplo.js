//Esto es el backend. Este archivo deberia estar vinculado a la pagina html a la que el usuario tiene acceso.
//Esto es igual independientemente de si usas una Api tipo REST o una SQL, asumo que para los otros tipos sera igual.

//La sintaxis salvo para GET, siempre es igual:
/*
    fetch(url, {codigo aca}); 

    fetch(url, {
        method: 'Lo que queres hacer (EN MAYUSCULAS)',       Ejemplos: PUT, POST O DELETE.
        body: JSON.Stringify(*OBJETO*),                      El objeto tiene que tener todo lo que mandas a la Api.
        headers: {'Content-type': 'application/json}         Nunca cambia, al menos en esta materia.
    })

*/

//PUT: Modificar o alterar informacion de la API.
function Cambiar(event){

    //Necesitamos conseguir los datos nuevos.
    //Supongamos vienen de un formulario.

    event.preventDefault();   //Hacemos lo de siempre con los formularios.
    datos = event.target;

    const loQueSeMandas = {     //Creamos un objeto, que va a contener todos los nuevos valores.
        nombre:       datos.nombre.value,
        apellido:     datos.apellido.value,
        direccion:    datos.direccion.value,
        curso:        datos.curso.value,
        edad:         datos.edad.value
    }

    const id = datos.id.value;      //Aparte, en una constante guardamos el id.

    //Indicamos la url de la Api:

    url = 'http://localhost:3000/soyunaurl/estudiantes/'
    
    fetch(url+ id, {                     //'http://localhost:3000/soyunaurl/estudiantes/:id'

    method: 'PUT',                       // Dice que es lo que vamos a hacer, en este caso, darle a la API informacion para cambiar en la base de datos.
    body: JSON.stringify(loQueSeMandas), // Convierte el objeto con los datos a una cadena JSON y lo guarda en el body.
    headers: {
      'Content-Type': 'application/json' // Indica que el cuerpo es JSON.
    }
    .then(res => {                                                    //.then(res => {codigo aca}) - Cuando llege la respuesta se ejecuta lo que este entre las llaves.
        if (!res.ok){throw new Error('El servidor tubo un problema');} //Comprueba si el codigo no es uno tipo ok (2XX), si no es es porque tubo un error la api.
        return res.json();                                            // Convierte la respuesta del servidor (JSON) a un objeto JS. Muy importante para lo que vamos a mostrar en la consola.
    })
    .then(data => {console.log(data);} )                              //Muestra en la consola la informacion.
    .catch(err => {console.log('Hiciste las cosas mal', err )})       //Si hay un error muestra esto.
  }) 

  //Algo a tener en consideracion es que el primer .then comprueba si hubo un problema del lado del servidor o API (Backend).
  //En cambio el .catch se ejecuta solo cuando la peticion (req), esta mala, es decir, hay un error del lado del cliente o tu pagina web (Frontend)

}

//POST: Subir informacion completamente nueva a la API.
function Crear(event){
    //Es practicamente igual al anterior.
    //Lo mismo que antes, soponemos que todo viene de un formulario.
    
    event.preventDefault();   //Hacemos lo de siempre con los formularios.
    datos = event.target;

    //Igualmente, necesitamos guardar todo en un objeto.
    const loQueSeMandas = {     //Creamos un objeto, que va a contener todos los nuevos valores.
        nombre:       datos.nombre.value,
        apellido:     datos.apellido.value,
        direccion:    datos.direccion.value,
        curso:        datos.curso.value,
        edad:         datos.edad.value
    }

    //Como estamos creando algo nuevo, no necesitamos guardar un id. La api tiene que darselo solo.
    //Guardamos otra vez la url en un link:

    url = 'http://localhost:3000/soyunaurl/estudiantes'

    fetch(url, {
        method: 'POST',                               //Indica el metodo que se va a usar.
        body: JSON.stringify(loQueSeMandas),          //Dice que en el cuerpo va estar el objeto. Siempre hay que usar JSON.stringify.
        headers: {'Content-Type': 'application/json'} // Indica que el cuerpo es JSON.
    })
    .then(res => {      
        if (!res.ok) { throw new Error('Error en la respuesta del servidor');} // Verifica si la respuesta fue exitosa (ej: código 200 OK, 201 Created).
        return res.json(); // Convierte la respuesta del servidor (JSON) a un objeto JS
    })
    .then(data => {console.log('Estudiante creado con éxito:', data); // Muestra los datos recibidos
    })
    .catch(error => {                                              //Si hay un error
        console.error('Hubo un problema con la petición:', error); // Maneja cualquier error de red o del servidor
    });

}

//DELETE: Borrar informacion de la base de datos que esta conectada a la api.
function Borrar(event){


    //En este caso como solo es borrar no necesitamos un guardar las cosas en un objeto. 
    //Pero si el id de lo que queremos borrar.
    
    event.preventDefault();   //Hacemos lo de siempre con los formularios.

    const id = event.target.id.value;

    //Establecemos la url
    url = 'http:localhost3000/soyunaurl/estudiantes/'

    fetch(url+id, {       //'http:localhost3000/soyunaurl/estudiantes/:id'
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }) //En este caso como no se envia nada, no hay body, porque la API accede al id en base a los parametros de la url y no del body.
    .then(res =>{
            
             if(!res.ok) {throw new Error('Hubo error');}
             return res.json();
    }
    .then(data => {console.log('Estudiante borado', data);})
    .catch(err => {console.error('Error che ', error)})             //Si pones console.log en vez de console.error es lo mismo, para que quede mas lindo en la consola es nomas.

}

