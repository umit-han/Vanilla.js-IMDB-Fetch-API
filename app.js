const form = document.getElementById('form'),
    inputSearch = document.getElementById('input-search'),
    btnSearch = document.getElementById('btn-search'),
    random = document.getElementById('random'),
    searchedWord = document.getElementById('searched-word'),
    cardFilm = document.getElementById('cards-film'),
    cardFilmDetail = document.getElementById('card-film-detail'),
    filmImg = document.getElementById('film-img');


// Search film and fetch from API
function searchFilm(e) {
    e.preventDefault();

    // Clear single film
    cardFilmDetail.innerHTML = '';
    filmImg.innerHTML = '';

    // Get search value
    const searchValue = inputSearch.value;

    // Check for empty
    if (searchValue.trim()) {
        fetch(`http://www.omdbapi.com/?apikey=9c725cb0&t=${searchValue}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                searchedWord.innerHTML = `The word you are looking for: '${searchValue}'`;

                if (data === null) {
                    searchedWord.innerHTML = `<p>There ara no search results. Try again</p>`
                } else {
                    var html = '';
                    html = `
                            <div class="card-film">
                                <img src="${data.Poster}" alt="img"    class="card-film-img">
                                <h2 class="card-film-name">${data.Title}</h2>
                                <p class="card-film-email">${data.Writer}</p>
                                <div class="card-film-more" data-filmID="${data.imdbID}">Click for more information...</div>
                            </div>
                        `;

                    cardFilm.innerHTML = html;
                }

            });
        // Clear search text
        inputSearch.value = '';
    } else {
        alert("Plase enter a search trem");
    }
}

// Fetch film by ID
function getFilmById(filmID) {
    fetch(`http://www.omdbapi.com/?apikey=9c725cb0&i=${filmID}`)
        .then(res => res.json())
        .then(data => {
            const film = data;

            addFilmToDOM(film);
        })
}

// Padding Function
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

// Random film
function getRandomFilm() {
    cardFilm.innerHTML = '';
    searchedWord.innerHTML = '';
    filmImg.innerHTML = '';

    const movie = pad(Math.floor((Math.random() * 2155529) + 1), 7);

    console.log(movie)

    fetch(`http://www.omdbapi.com/?apikey=9c725cb0&i=tt${movie}`)
        .then(res => res.json())
        .then(data => {
            const film = data

            addFilmToDOM(film)
        })

}

// Add film to DOM
function addFilmToDOM(film) {



    filmImg.innerHTML = `
        <img src="${film.Poster}" alt="img">
    `

    cardFilmDetail.innerHTML = `
        <div class="card-film-detail">
        <div class="card-row">
            <div class="card-col">Title</div>
            <div class="card-col">${film.Title}</div>
        </div>
        <div class="card-row">
            <div class="card-col">Writer</div>
            <div class="card-col">${film.Writer}</div>
        </div>
        <div class="card-row">
            <div class="card-col">Awards</div>
            <div class="card-col">${film.Awards}</div>
        </div>
        <div class="card-row">
            <div class="card-col">Director</div>
            <div class="card-col">${film.Director}</div>
        </div>
        <div class="card-row">
            <div class="card-col">Genre</div>
            <div class="card-col">${film.Genre}</div>
        </div>
        <div class="card-row">
            <div class="card-col">Released</div>
            <div class="card-col">${film.Released}</div>
        </div>
        <div class="card-row">
            <div class="card-col">DVD</div>
            <div class="card-col">${film.DVD}</div>
        </div>
        <div class="card-row">
            <div class="card-col">IMDB Rating</div>
            <div class="card-col">${film.imdbRating}</div>
        </div>
        <div class="card-row">
            <div class="card-col">Runtime</div>
            <div class="card-col">${film.Runtime}</div>
        </div>
        <div class="card-row">
            <div class="card-col">Actors</div>
            <div class="card-col">${film.Actors}</div>
        </div>
        <div class="card-row">
            <div class="card-col">Plot</div>
            <div class="card-col">${film.Plot}</div>
        </div>

        </div>

    `
}

// Event listeners
form.addEventListener('submit', searchFilm);
random.addEventListener('click', getRandomFilm)

cardFilm.addEventListener('click', e => {
    const cardFilmMore = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('card-film-more');
        } else {
            return false;
        }
    });

    if (cardFilmMore) {
        const filmID = cardFilmMore.getAttribute('data-filmid');
        getFilmById(filmID);
    }
})