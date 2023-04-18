// script.js
const characterContainer = document.getElementById('characterContainer');
const characterFilter = document.getElementById('characterFilter');
// main.js

// Obtén todas las cards
const cards = document.querySelectorAll('.card');

// Agrega un event listener para cada card que ejecute la función 'moveCard' al pasar el cursor por encima
cards.forEach(card => {
  card.addEventListener('mouseover', moveCard);
});

// Función para mover la card hacia arriba al pasar el cursor por encima
function moveCard(event) {
  const card = event.target;
  // Aplica la transformación solo si la card no ha sido movida previamente
  if (!card.classList.contains('moved')) {
    card.style.transform = 'translateY(-10px)';
    // Agrega la clase 'moved' para marcar la card como movida
    card.classList.add('moved');
  }
}

// Agrega un event listener para resetear la posición de la card al quitar el cursor
cards.forEach(card => {
  card.addEventListener('mouseout', resetCard);
});

// Función para resetear la posición de la card al quitar el cursor
function resetCard(event) {
  const card = event.target;
  // Quita la transformación solo si la card ha sido movida previamente
  if (card.classList.contains('moved')) {
    card.style.transform = '';
    // Quita la clase 'moved' para marcar la card como no movida
    card.classList.remove('moved');
  }
}


// Cargar contenido desde la API
fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => {
        const characters = data.results;
        // Llenar opciones de filtro
        characters.forEach(character => {
            const option = document.createElement('option');
            option.value = character.name;
            option.textContent = character.name;
            characterFilter.appendChild(option);
        });
        // Mostrar todas las cards al principio
        showCharacters(characters);
    })
    .catch(error => console.error(error));

// Función para mostrar las cards de acuerdo al filtro seleccionado
characterFilter.addEventListener('change', () => {
    const selectedCharacter = characterFilter.value;
    if (selectedCharacter === 'all') {
        const allCharacters = document.querySelectorAll('.card');
        allCharacters.forEach(character => character.style.display = 'block');
    } else {
        const filteredCharacters = document.querySelectorAll(`.card:not([data-name="${selectedCharacter}"])`);
        const charactersToHide = document.querySelectorAll(`.card[data-name="${selectedCharacter}"]`);
        filteredCharacters.forEach(character => character.style.display = 'none');
        charactersToHide.forEach(character => character.style.display = 'block');
    }
});

// Función para mostrar todas las cards al principio
function showCharacters(characters) {
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.name = character.name;
        const image = document.createElement('img');
        image.src = character.image;
        image.alt = character.name;
        const name = document.createElement('h2');
        name.textContent = character.name;
        card.appendChild(image);
        card.appendChild(name);
        characterContainer.appendChild(card);
    });
}

