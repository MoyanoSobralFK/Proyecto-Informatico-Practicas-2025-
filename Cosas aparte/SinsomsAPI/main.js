//document.body.style.backgroundColor= `rgb(${1}, ${120}, ${10})`;
let url = 'https://thesimpsonsapi.com/api/characters/';
let i = 1;
let character = 0;
let aux = 1;
let esAzar;
if (aux==1)
{
    siguiente()
    siguiente()
    aux=0;
    i =1;
}

function anterior(){
    if (i>1) {i = i-1;}
    else{alert ("No se puede ir mas atras");}
    console.log(url+i);
    cargarPer(i-1);
}

function siguiente(){
    if (i<1182) {i= i+1}
    else{alert ("No se puede ir mas adelante");}
    console.log(url+i);
    cargarPer(i);
}


function cargarPer()
{
    fetch(url+i)
    .then(res => res.json())   
    .then(data => 
    character = data,
    console.log(character),
    cambiarPer(),
    );
}


function cambiarPer(){
    alert(url+i);
    let nombre = document.getElementById("nombre");
    let name = character.name;
    alert(name)
    nombre.textContent = name;
    console.log(name);

    let idH1 = document.getElementById("id");
    idH1.textContent = i;

    let descrip = document.getElementById("descrip");
    let description = character.description
    descrip.textContent = description;

    let edad = document.getElementById("edad");
    let age = character.age
    if (age == null) {age = "Desconocida"}
    edad.textContent = "Edad: "+age;

    let sexo = document.getElementById("sexo");
    let gender = character.gender
    if       (gender == "male")   {gender = "Hombre"}
    else {if (gender == "female") {gender ="Mujer"}
    else {if (gender== null){gender ="Desconocido"}}}
    sexo.textContent ="Sexo: "+gender;

    let trabajo = document.getElementById("trabajo");
    let job = character.job
    
    trabajo.textContent = job;

    let foto = document.getElementById("foto");

foto.srcset = `https://cdn.thesimpsonsapi.com/500/character/${i-1}.webp`;

        
    

}

function azar(){
    esAzar = true;
    i = Math.random() * (1 - 1182) + 1182;
    i = Math.trunc(i);
    console.log(i);
    cargarPer(i);
    cambiarPer(i);
    foto.srcset = `https://cdn.thesimpsonsapi.com/500/character/${i}.webp`;
}

function handleSubmit(event) {
    event.preventDefault();    // para evitar la redireccion por default
    let form = event.target;   // el elemento que genero el evento
    i = form.numero.value; 
    alert(i);
    cargarPer(i);
    cambiarPer();
}
/*while (i<1182){
    function crearOpcion()
{
    i++;
    var selector = document.getElementById("selector");
    let name = character.name;
    var opcion = document.createElement("option");
    option.text = name;
    aficiones.add(selector);
    if (i == 1181)
    {alert(i);}
}
}*/
