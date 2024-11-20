// Exercice 1 : API Random User
const randomUserButton = document.getElementById('get-random-user');
const userInfoDiv = document.getElementById('user-info');

randomUserButton.addEventListener('click', () => {
  fetch('https://randomuser.me/api')
    .then(response => response.json())
    .then(data => {
      const user = data.results[0];
      userInfoDiv.innerHTML = `
        <img src="${user.picture.large}" alt="Photo de ${user.name.first}">
        <p><strong>Nom :</strong> ${user.name.last}</p>
        <p><strong>Prénom :</strong> ${user.name.first}</p>
      `;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération de l\'utilisateur aléatoire :', error);
    });
});

// Exercice 2 : API Pokémon
const pokemonListSelect = document.getElementById('pokemon-list');
const pokemonInfoDiv = document.getElementById('pokemon-info');
const showPokemonButton = document.getElementById('show-pokemon-details');

window.addEventListener('DOMContentLoaded', () => {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    .then(response => response.json())
    .then(data => {
      const pokemons = data.results;
      pokemonListSelect.innerHTML = pokemons
        .map(pokemon => `<option value="${pokemon.url}">${pokemon.name}</option>`)
        .join('');
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des pokémons :', error);
    });
});

// Afficher le détail du Pokémon sélectionné
showPokemonButton.addEventListener('click', () => {
  const selectedPokemonUrl = pokemonListSelect.value;

  if (!selectedPokemonUrl) {
    pokemonInfoDiv.innerHTML = '<p>Aucun Pokémon sélectionné.</p>';
    return;
  }

  fetch(selectedPokemonUrl)
    .then(response => response.json())
    .then(pokemon => {
      pokemonInfoDiv.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="Sprite de ${pokemon.name}" title="Sprite de ${pokemon.name}">
        <p><strong>Nom :</strong> ${pokemon.name}</p>
      `;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération du détail du Pokémon :', error);
    });
});
