const url = "https://pokeapi.co/api/v2/pokemon";

const getRandomInt = (min, max) =>{
    return Math.floor(Math.random() * (max-min)) + min;
}

const fetchData = async (id) =>{
    try {
        const res = await fetch(`${url}/${id}`)
        const data = await res.json();
        const pokemon ={
            img: data.sprites.front_default,
            name: data.name,
            type: data.types.map(type => type.type.name).join("/"),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            specialAttack: data.stats[3].base_stat,
            specialDefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat
        }
        pintarCard(pokemon);
    } catch (error) {
        console.log(error);
    }
}

const pintarCard = (pokemon) =>{
    let container = document.querySelector('.container-body')
    let template = document.querySelector('#template-card').content 
    let clone = template.cloneNode(true)
    let fragment = document.createDocumentFragment()
    
    clone.querySelector('.card-body-img').setAttribute('src',pokemon.img)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name}`
    clone.querySelector('.card-body-text').innerHTML = `${pokemon.type}`
    clone.querySelectorAll('.card-footer-social p')[0].textContent = pokemon.hp
    clone.querySelectorAll('.card-footer-social p')[1].textContent = pokemon.attack
    clone.querySelectorAll('.card-footer-social p')[2].textContent = pokemon.defense
    clone.querySelectorAll('.card-footer-social p')[3].textContent = pokemon.specialAttack
    clone.querySelectorAll('.card-footer-social p')[4].textContent = pokemon.specialDefense
    clone.querySelectorAll('.card-footer-social p')[5].textContent = pokemon.speed
    fragment.appendChild(clone)
    container.appendChild(fragment)
}


const  pokemons = () =>{
    for(i=0; i<=5; i++){
        fetchData(getRandomInt(1,899));
    }
}
pokemons();
