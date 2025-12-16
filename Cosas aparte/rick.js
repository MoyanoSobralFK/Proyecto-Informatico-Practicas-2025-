let n=0;
if (n==0){cargarPersonajes(); n=1}

let url ='https://rickandmortyapi.com/api/character/'



    for(let i=1; i<11; i++){
        
        console.log(url+1);
        fetch(url+i)
        .then (res => res.json())
        .then (data =>{
        
                person = data;
                nombre = person.name;
                estado = person.status;
                especie = person.species;

                console.log(`${i} -  ${nombre} es un ${especie}  y esta  ${estado}`);
         })

         .catch(error => {console.error('Hay un horror papa. error', error);}
         );
    }

//Crear 10 targetas distintas.

function definirTarjeta(personaje){
        let tarjeta = document.createElement('div');

        let H1      = document.createElement('h1')
        H1.textContent = personaje.name;
        let FOTO    = document.createElement('img')
        FOTO.src    = personaje.image;
        let H6      = document.createElement('h6')

        tarjeta.appendChild(H1);
        tarjeta.appendChild(FOTO);
        tarjeta.appendChild(H6);
        return tarjeta;
};

function AñadirPersonajes(lista_de_personajes){
    
    contenedor_generico = document.createElement('div')
    
    for (let personaje of lista_de_personajes)
    {
        let nuevoP = definirTarjeta(personaje);
        contenedor_generico.appendChild(nuevoP);
    }

    document.body.appendChild(contenedor_generico);
}

function cargarPersonajes(){
    fetch('https://rickandmortyapi.com/api/character')
    .then(res => res.json())
    .then(data =>{AñadirPersonajes(data.results);})
}






alert("javascript vinculado");