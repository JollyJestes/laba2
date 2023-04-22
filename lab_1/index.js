const pokemonList = document.getElementById('pokemon-list');
const searchInput = document.getElementById('search');
const totalPokemon = document.getElementById('total-pokemon');
let pokemons = [];

// Отправляем GET-запрос к API PokeAPI и выводим список покемонов
fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(response => response.json())
    .then(data => {
        totalPokemon.innerText = `Total Pokemon: ${data.count}`;
        pokemons = data.results.map(pokemon => ({
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`
        }));
        displayPokemons(pokemons);
    });

// Фильтруем список покемонов в соответствии с введенным пользователем запросом
function filterPokemon() {
    const filterValue = searchInput.value.toLowerCase();
    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.includes(filterValue));
    displayPokemons(filteredPokemons);
}

searchInput.addEventListener('input', filterPokemon);

// Функция для отображения списка покемонов на странице
function displayPokemons(filteredPokemons) {
    pokemonList.innerHTML = '';
    if (filteredPokemons.length === 0) {
        pokemonList.textContent = 'No Pokemon found';
    } else {
        filteredPokemons.forEach(pokemon => {
            const listItem = document.createElement('li');
            const pokemonName = pokemon.name;

            // Создаем кнопку "Удалить"
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                listItem.remove();
            });

            // Создаем тег img и добавляем его в элемент списка
            const img = document.createElement('img');
            img.alt = pokemonName;
            img.classList.add('pokemon-image');
            img.src = pokemon.image;

            // Добавляем кнопку "Удалить" и название покемона в элемент списка
            listItem.textContent = pokemonName;
            listItem.appendChild(deleteButton);
            listItem.appendChild(img);
            pokemonList.appendChild(listItem);

            // Обрабатываем клик по элементу списка
            listItem.addEventListener('click', () => {
                searchInput.value = pokemonName;
                pokemonList.style.display = 'none';
            });
        });
    }
}

// Обработчик клика на документе для скрытия списка покемонов
document.addEventListener('click', (event) => {
    if (!event.target.closest('#pokemon-list') && !event.target.matches('#search')) {
        pokemonList.style.display = 'none';
    }
});
