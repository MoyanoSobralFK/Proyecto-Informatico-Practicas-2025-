 
// const h1Elemento = document.getElementById("tituloPrincipal");    La variable selecciona el elemento del html con id "tituloPrincipal".
const todosLosH1   = document.querySelectorAll('h1');               // La variable selecciona todos los h1.
const todosLosForm = document.querySelectorAll('form');           // La variable selecciona todos los formularios.
let i = 0;

/////////////////////////////////////////////////////////////////////////////////
function azar(){ // Cuando apretamos el botom azar se ejecuta esta funcion.

    let rojo = Math.random() * (0 - 256) + 256;
    let verde =Math.random() * (0 - 256) + 256;
    let azul = Math.random() * (0 - 256) + 256;
 
    console.log(rojo,verde,azul)
    document.body.style.backgroundColor= `rgb(${rojo}, ${verde}, ${azul})`;   //Cambia el color del FONDO.

    todosLosH1.forEach(h1 => {    // Recorre cada h1 y cambia su estilo
  h1.style.color = `rgb(${azul}, ${rojo}, ${verde})`;                         //Cambia el color del CONTENIDO (El texto).
  h1.style.backgroundColor = `rgb(${verde}, ${azul}, ${rojo})`;              //Contenido no es lo mismo que el fondo.
});                                                                           

 todosLosForm.forEach(form => {    // Recorre cada furmulario y cambia su estilo
  form.style.borderColor = `rgb(${verde}, ${azul}, ${rojo})`;            //Cambia el color del fondo del formulario, no el contenido.
  form.style.backgroundColor = `rgb(${azul}, ${rojo}, ${verde})`;
});

    //Creo una variable (inputR) que tendra su valor vinculado al del elemento con el id "r_id". Como ese id lo tiene un input del formulario el numero que pusimos
    const inputR = document.getElementById('r_id'); //en ese input es compartido por el y la variable.
    inputR.value = rojo;                            //Ahora hago que la variable inputR tenga el valor que salio en la variable rojo. Como el valor era tambien el
    const inputG = document.getElementById('g_id'); //del input con el id "r_id", ahora el numero que toco se muestra en el campo r dentro de la pagina.
    inputG.value = verde;                           //Lo mismo con los otros colores. La unica diferencia es que al ser otros inputs, uso otras variables y
    const inputB = document.getElementById('b_id'); //identificadores segun corresponda.
    inputB.value = azul;                            //Ej: Para el cambiar el valor del imput b (blue), uso la constante "inputB" y la variable "azul".
  
    const botomAzar = document.getElementById('botomAzar'); //Mediante su id "guardo" en una variable al botom para manipularlo.
    if (botomAzar.textContent == "Apretame")                //Si el texto del botom es "Apretame" quiere decir que nunca fue tocado, o se uso el formulario, en-
    {                                                       //tonces lo modificamos.
       botomAzar.textContent = "¡Me apretaste!"             //Cambiamos el texto para que nos diga que lo apretamos.
       i = i+1                                              //Al contador que nos indica cuantas veces lo apretamos le sumamos uno, para que efectivamente nos
    }                                                       //diga cuantas veces es que lo apretamos.
    
    else                                                    //Si el texto no es "Apretame" quiere decir que ya lo apretamos.
    {                                                       //¡DE ACA
      i++;                                                   
      if (i<=100)
      {
        botomAzar.textContent = "¡Me apretaste "+i+" veces!"; 
      }

      else
      {
        if (i<=1000){botomAzar.textContent = "Para ya me apretaste "+i+" veces";}
        else   {botomAzar.textContent = "Loco dale, "+i+" veces ¿No tenes nada mejor que hacer?"}
      }                                            
    }                                                       //HASTA ACA! Es logica "de" C / Laboratorio. Lo unico de javascript es lo de *variable*.textContent
                                                            //para usar como argumento del if y cambiarle lo que dice.
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// handlers para los eventos de submit y click
function handleSubmit(event) {
  event.preventDefault(); // para evitar la redireccion por default
  let form = event.target; // el elemento que genero el evento
  let rojo = form.r.value; 
  let verde = form.g.value; // accedo por nombre a los inputs y con propiedad value
  let azul = form.b.value; 
 
  console.log(rojo,verde,azul);
  
    document.body.style.backgroundColor= `rgb(${rojo}, ${verde}, ${azul})`;
  
  //form.reset();  // blanquea todos los inputss
      todosLosH1.forEach(h1 => {    // Recorre cada h1 y cambiar su estilo
  h1.style.color = `rgb(${azul}, ${rojo}, ${verde})`;     
});

  if (botomAzar.textContent != "Apretame")
  {
    botomAzar.textContent = "Apretame";
  }

}



