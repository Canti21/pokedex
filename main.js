const pokeName = document.getElementById("data-poke-name");
const pokeImg = document.getElementById("poke-img");
const pokeImgContainer = document.getElementById("poke-img-container");
const pokeId = document.getElementById("data-poke-id");
const pokeTypes = document.getElementById("data-poke-types");
const pokeStats = document.getElementById("poke-stats");

const typeColors = {
    electric: '#FFEA70',
    normal: '#000000',
    fire: '#FF675C',
    water: '#88d9ff',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#00ed07',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#ff00f0',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#b6b6b6',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite =  data.sprites.other['official-artwork'].front_default;
    const { stats, types } = data;
    pokeName.textContent = data.name;
    pokeImg.style.animation = 'none';
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.backgroundSize = ' 16px 16x';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    console.log("renderPokemonStats...");
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElementAmount = document.createElement("div");
        statElementAmount.textContent = stat.base_stat;
        pokeStats.appendChild(statElementAmount);
    });
}

const renderNotFound = () => {
    pokeName.textContent = "Not Found";
    pokeId.textContent = "---";
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';   
    pokeImg.setAttribute('src', './assets/img/pokenotfound.svg');
}