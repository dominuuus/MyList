const modalBackground = document.getElementById('modal-background');
const modalContainer = document.getElementById('modal-container');

let currentTvShow = {};

function backgroundClickHandler() {
    overlay.classList.remove('open');
}

function addCurrentTvShowToList(id) {
    const selectedTvShow = currentTvShow.find(item => item.id === id);
    if (isTvShowAlreadyOnList(currentTvShow.id)) {
        notie.alert({type: 'error', text: 'Already in your list'})
    }

    if(selectedTvShow) {
        updateUI(selectedTvShow);
        addToList(selectedTvShow);
        updateLocalStorage();
    }
    
}

function createModal(data) {

    currentTvShow = data;

    
    currentTvShow.map(item => {
        const card = document.createElement('section');
        card.innerHTML = `<h2 id="tvShow-title">${item.name}</h2>
                <section id="modal-body">
                    <div><img id="tvShow-image" src=${item.image} alt="Poster"></div>

                    <div id="tvShow-info">
                        <div id="tvShow-originalTitle">
                            <h5>Original title: </h5>
                            <h4>${item.originalName}</h4>
                        </div>
                        <div id="tvShow-overview">
                            <h5>Overview: </h5>
                            <h4>${item.overview}</h4>
                        </div>
                        <div id="tvShow-releaseDate">
                            <h5>Release Date: </h5>
                            <h4>${item.firstAirDate}</h4>
                        </div>
                        <div id="tvShow-genres">
                            <h5>Genres: </h5>
                            <h4>${item.genres}</h4>
                        </div>
                        <div id="tvShow-popularity">
                            <h5>Popularity: </h5>
                            <h4>${item.popularity}</h4>
                        </div>
                    </div>
                </section>
                <section id="modal-footer">
                    <button id="add-to-list" onclick='{addCurrentTvShowToList(${item.id})}'>Adicionar à lista</button>
                </section>
            </section>`;
        modalContainer.appendChild(card);
        overlay.classList.add('open');

        console.log('Card: ' + card);
        console.log('Item: ' + item);
    }
    )
}

modalBackground.addEventListener('click', backgroundClickHandler);