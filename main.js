//Adicional:

alert("Hola, Soy el mensaje de KUNDO");

function CORRECTO(){
    alert("¡CORRECTO!");
}

function INCORRECTO(){
    alert("INCORRECTO....")
}




///////////////////////////////////////////PRUEBA 2:

//Ejercicio 1: "Indicar verdadero o Falso".

//a

function VerdaderoP2(event){
    event.preventDefault();
    alert("¡CORRECTO!");
}

//Ejercicio 6: "Completar los espacios en blanco".

function ejercicio6(){              //Para que cuando se use en el ejercicio 8 la funcion de abajo no salgan mensajes de cuanto valen r, g, b, 
                                    //hice esta funcion que llama a ramdomHasta255 y diga que numero dio, porque si no vas a estar dandole a aceptar como loco cuando ejecutes la funcion del ejercicio 8, si queres intentalo y proba que pasa.
    let numero = ramdomHasta255();
    alert ("Te toco "+numero+".");
}

function ramdomHasta255(){
    return Math.floor(Math.random() * 256);        //"Math.ramdon() * X" es una funcion que elije un numero al azar menor a X.
}                                                  //"Math.floor(Y)" redondea a Y al numero entero mas cercano

//Ejercicio 7: "Completar los espacios en blanco". 

function ejercicio7(e) {
    
    e.preventDefault();                                    //Si no se pone se reinicia la pagina y no pasa nada.
    
    let name = e.target.name.value;                      //Guardamos el valor del input con nombre "nom" en una variable.
    alert(`¡Hola ${name}!`);                            //Mostramos el mensaje.
    name.reset();                                      //Pone el formulario en blanco.
}

//Ejercicio 8 "Completar los espacios en blanco.


function ejercicio8(){
  
    for(let i=0; i<16; i++){
        let div = document.createElement('div');             //Crea el div.
      
        let r = ramdomHasta255();
        let g = ramdomHasta255();
        let b = ramdomHasta255();
        
        div.style.backgroundColor = `rgb(${r}, ${g}, ${b})`; //Le da color a su fondo.
        

        div.textContent = i+1;                                //OPCIONAL: Hacer diga su numero.
        document.body.appendChild(div);                     //Lo añade a la pagina.
        
        console.log(`${i+1}:  ${r}, ${g}, ${b},`);                      //OPCIONAL: Poner en la consola que valores tiene cada div.
       }
        alert("Anda al final de la pagina.");
}

//Ejercicio 2 13 "Formulario que da dos numeros a y b, se y crea un parrafo con el resultado"

    function ejercicio213(event){

        event.preventDefault();             //Evita que se reinicie la pagina.

        numeros = event.target;             //"Guarda" la informacion del formulario en una variable.
        n1 = numeros.a.value;               //Accede al valor del campo "a" del formulario.
        n1 = parseInt(n1);                  //Hace que n1 pase de ser un string a ser un numero INT.
        if (n1>=0 ||n1<=0) {n1 = n1;}       //Si n1 posee un numero, n1 queda igual.
        else                {n1 = 0;}       //Si n1 posee un string (caracter de texto), que no corresponde a un numero le asigna 0.

        n2 = numeros.b.value;
        n2 = parseInt(n2);
        if (n2 >0 || n2<=0) {n2 = n2;}
        else                 {n2 = 0;}

        resultado = n1 + n2;

        parrafo = document.createElement('p');  //Crea el parrafo.

        if(n2<0){parrafo.textContent = `${n1}   ${n2} = ${resultado}`;}  //textContent sirve para cambiar el texto de un elemento.
        else    {parrafo.textContent = `${n1} + ${n2} = ${resultado}`;}


        document.body.appendChild(parrafo);                             //Pone en la pagina el parrafo.
        numeros.reset();                                                  //Vacia el formulario.
    }

//Ejercicio Z

function ejercicioZ(event){
    event.preventDefault();                  //Evita que la pagina reinicie.

    numeros = event.target;                  //Guarda la informacion del formulario en una variable.
    numero_menor = numeros.a.value;          //Obtiene el valor del input a.
    numero_menor = parseInt(numero_menor);   //Los inputs numericos envian los numeros como texto, por eso los pasamos a numeros usando la funcion parseInt().
                                             //NOTA: Si bien la funcion se llama parseInt, Int NO es un tipo de dato en javascript. Tampoco Float o Char.
    numero_mayor = numeros.b.value;
    numero_mayor = parseInt(numero_mayor);


    if (numero_menor>=0 || numero_menor<=0) { numero_menor = numero_menor;}   //Si el usuario envia el formulario sin cambiar los valores de los inputs, los valores que
    else                                    { numero_menor = 0;}             // que llegan a javascript van a ser los placeholders, y como las letras a y b no son
                                                                            // numeros va a haber errores. Para evitarlos verificamos que sean numeros, y si son
    if (numero_mayor >0 || numero_mayor<=0) {numero_mayor = numero_mayor;} // letras les asignamos 0.
    else                 {numero_mayor = 0;} 

    if (numero_mayor<numero_menor);         //Si "numero_mayor" es mas chico que "numero_menor", intercambia los valores.
    {
        aux          = numero_mayor;
        numero_mayor = numero_menor;
        numero_menor = aux;
    }

    let vector = ["Xd"];                                                //Declaramos un vector, como no puede estar vacio le ponemos un valor cualquiera.

    for (let i= numero_menor; i<numero_mayor+1; i++)                    //Un ciclo for que recorre los numeros entre los que puso el usuario.
    {
        vector.push(i);     //Se agrega al final del vector el valor actual de i.
    }

    
    vector.shift() //Como "Xd" no va, lo eliminamos usando shift(), que borra el primer valor del vector.
    console.log(vector); alert("Anda abajo de todo.")

    JSON.stringify(vector);                                        //Convierte el vector en texto.
    nuevoParrafo = document.createElement("p");                   //Declaramos un nuevo parrafo.
    nuevoParrafo.textContent = "El vector es: "+vector;          //Le damos al parrafo texto.

    document.body.appendChild(nuevoParrafo);                    //Agrega el parrafo al doumento.
    //NOTA: El parrafo puede contener el contendido del vector en su texto sin usar JSON.stringify, asi que no sabria decir que utilidad tiene esto.
}