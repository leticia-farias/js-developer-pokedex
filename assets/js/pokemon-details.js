function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const abilities = pokeDetail.abilities.map((typeSlot) => typeSlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function fetchPokemonDetail(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(convertPokeApiDetailToPokemon)
        .then(renderPokemonDetail)
}

function renderPokemonDetail(pokemon) {
    const detail = document.getElementById('pokemonDetail')

    detail.innerHTML = `
    <main class="${pokemon.type}">
        <div class="pokemon__header_figure">
            <div class="pokemon__header">
                <div>
                    <h1 class="name">${pokemon.name}</h1>
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <span class="number">#${pokemon.number}</span>
            </div>
            <figure>
                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
            </figure>
        </div>
        <div class="details">
            <nav>
                <span>About</span>
            </nav>
            <ul>
                <div class="about__info">
                    <li>Species</li>
                    <span>sla</span>
                </div>
                <div class="about__info">
                    <li>Height</li>
                    <span>${pokemon.height}</span>
                </div>
                <div class="about__info">
                    <li>Weight</li>
                    <span>${pokemon.weight}</span>
                </div>
                <div class="about__info">
                    <li>Abilities</li>
                    <ol class="abilities">
                    ${pokemon.abilities.map((ability) => `<li class="type ${ability}">${ability}</li>`).join('')}
                </ol>
                </div>
            </ul>
            <h3>Breeding</h3>
            <ul>
                <div class="about__info">
                    <li>Gender</li>
                    <span>sla</span>
                </div>
                <div class="about__info">
                    <li>Egg Groups</li>
                    <span>sla</span>
                </div>
            
                <div class="about__info">
                    <li>Egg Cycle</li>
                    <span>sla</span>
                </div>
            </ul>
        </div>
    </main>
    `
}

function getPokemonIdFromUrl() {
    const params = new URLSearchParams(window.location.search)
    return params.get('id')
}

const id = getPokemonIdFromUrl()
fetchPokemonDetail(id)