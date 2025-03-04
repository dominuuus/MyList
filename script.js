const searchButton = document.getElementById('searchButton');
const overlay = document.getElementById('modal-overlay');
const tvShowSearchName = document.getElementById('searchContent');
const tvShowTitle = document.getElementById('tvShow-title');
const tvShowOriginalTitle = document.getElementById('tvShow-originalTitle');
const tvShowOverview = document.getElementById('tvShow-overview');
const tvShowReleaseDate = document.getElementById('tvShow-releaseDate');
const tvShowGenres = document.getElementById('tvShow-genres');
const tvShowPopularity = document.getElementById('tvShow-popularity');
const languageSelect = document.getElementById('language');
const tvShowListContainer = document.getElementById('tvShow-list');

let tvShowList = JSON.parse(localStorage.getItem('tvShowList')) ?? [];

async function searchButtonClickHandler() {
    const selectedLanguage = languageSelect.value;

    const url = `https://tvshow.p.rapidapi.com/Serie/Search?Language=${selectedLanguage}&Content=${tvShowParameterGenerator()}&Adult=true&Page=1`;

    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '097179bbb6msh3787082c0e055f8p15de73jsnf5a268d4e033',
		'x-rapidapi-host': 'tvshow.p.rapidapi.com'
	}
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        console.log('Data' + data);

        if(data.Error) {
            throw new Error('TvShow not found');
        }

        createModal(data);
        overlay.classList.add('open');
        
               

    } catch(error) {
        notie.alert({type: 'error', text: 'error.message'});
    }
}

function tvShowParameterGenerator() {
    if (tvShowSearchName.value === '') {
        throw new Error('O nome da série deve ser informado');
    }
    return tvShowSearchName.value;

}

function addToList(data) {
    tvShowList.push(data);    
}

function isTvShowAlreadyOnList(id) {
    function doesThisIdBelongToThisTvShow(data) {
        return data.id === id;
    } 
    return Boolean(tvShowList.find(doesThisIdBelongToThisTvShow));
}

function updateUI(item) {
    tvShowListContainer.innerHTML += `<article id="tvShow-card-${item.id}">
    <div>
        <img src=${item.image} alt="Poster of ${item.originalName}">
        <h4>${item.name}</h4>
        <button class="remove-button" onclick="{removeTvShowFromList('${item.id}')}"><i class="fa fa-trash"></i> Remover</button>
    </div>         
</article>`
}

function removeTvShowFromList(id) {
    notie.confirm({
        text: "Deseja remover o filme de sua lista?",
        submitText: "Sim",
        cancelText: "Não",
        position: "top",
        submitCallback: function removeTvShow() {
            tvShowList = tvShowList.filter(tvShow => tvShow.id !== id);
            const tvShowCard = document.getElementById(`tvShow-card-${id}`);
                if (tvShowCard) {
                    tvShowCard.remove();
                    notie.alert({type: 'success', text: 'Série removida com sucesso!'});
                } else {
                    notie.alert({type: 'error', text: 'Card da série não encontrado.'});
                }
            updateLocalStorage();

        }
    })
}

function updateLocalStorage() {
    localStorage.setItem("tvShowList", JSON.stringify(tvShowList));
}

for (const tvShowInfo of tvShowList) {
    updateUI(tvShowInfo);
    }

searchButton.addEventListener('click', searchButtonClickHandler);

