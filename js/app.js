// api data load 
const sportsDataLoad = (player) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${player}`;

    fetch(url)
        .then(res => {
            if (res.status >= 200 && res.status <= 299) {
                return res.json();
            } else {
                throw Error(res.statusText);
            }
        })
        .then(data => playerDataDisplay(data))
        .catch(err => console.log(err.statusText))
}


// load window all post
window.addEventListener('load', () => {
        sportsDataLoad('b')
    })
    // search result
const searchBtn = () => {
    const searchInput = document.getElementById('search-input');
    const searchInputValue = searchInput.value;
    sportsDataLoad(searchInputValue)
}

// show data in display
const playerDataDisplay = (data) => {
    console.log(data.player)
    const players = document.getElementById('player-result');
    players.textContent = ""
    data.player.forEach(player => {
        console.log(player)
        const div = document.createElement('div');
        div.classList.add('col');
        // play name change
        const play = () => {
            if (player.strSport === "Soccer") {
                return "Football"
            } else {
                return player.strSport;
            }
        }
        div.innerHTML = `      
        <div class="card h-100">
                    <img src="${player.strCutout?player.strCutout:"img/blankimg.jpg"}" class="card-img-top border-bottom" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${player.strPlayer?player.strPlayer:"Player"}</h5>
                        
                        <p class="card-text">${player.strDescriptionEN.slice(0,100)}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <small class="text-info">${play()?play():""}</small>
                        <small  class="btn btn-info btn-sm text-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="singlePlayerId(${player.idPlayer})">Learn more..</small>

                    </div>
                </div>
        `
        players.appendChild(div);
    })

}



// single player id call
const singlePlayerId = (singleId) => {
    singlePlayer(singleId)
}

// single data load

const singlePlayer = (playerId) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
    fetch(url)
        .then(res => {
            if (res.status >= 200 && res.status <= 299) {
                return res.json();
            } else {
                throw Error(res.statusText);
            }
        })
        .then(data => singlePlayerDiplay(data))
        .catch(err => console.log(err.statusText))
}

// single playar display
const singlePlayerDiplay = (data) => {
    console.log(data)
}