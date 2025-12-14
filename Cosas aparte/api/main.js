let url = "http://localhost:3210/api-escuela"
const datos = 0;
function enviarEstudiante(event)
{
    event.preventDefault();         // Evitar que la pagina se vuelva a cargar sola.
    
    alumno = event.target            //Alumno va a tener toda la informacion del formulario.

    const datos = {
                
        nombre:       alumno.nombre.value,
        apellido:     alumno.apellido.value,
        especialidad: alumno.especialidad.value,
        descripcion:  alumno.descripcion.value
};
    
    alert("Estudiante enviado")
    console.log(datos);
    tipoDeSubida = '/alumnos'
    
    enviardatos(datos);

}

function enviarProf(event)
{
    event.preventDefault();

    prof = event.target

    const datos = {
        nombre:       prof.nombre.value,
        apellido:     prof.apellido.value,
        materia:      prof.materia.value,
        descripcion:  prof.descripcion.value
    };

    alert("Profesor enviado");
    console.log(datos);
    
    tipoDeSubida= '/profesores'
    enviardatos(datos);

}

function enviardatos(datos)
{
    console.log(url+tipoDeSubida+'\nEl cuerpo de la peticion es:\n'+datos)
     fetch(url + tipoDeSubida, {

    method: 'POST',              // Dice que es lo que vamos a hacer, en este caso, darle a la API nueva informacion para ingresar en la base de datos.
    body: JSON.stringify(datos), // Convierte el objeto de datos a una cadena JSON
    headers: {
      'Content-Type': 'application/json' // Indica que el cuerpo es JSON
    }
  })  
}



