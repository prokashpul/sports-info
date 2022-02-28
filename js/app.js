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


// pageload 
const pageToggle = (dispaly) => {
    const singlePlayerView = document.getElementById('single-player');
    singlePlayerView.style.display = dispaly;
}


// single player id call
const singlePlayerId = (singleId) => {
    pageToggle("none");
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
    console.log(data.players[0])
    const singlePlayerView = document.getElementById('single-player');
    const div = document.createElement("div")
    singlePlayerView.innerHTML = "";
    pageToggle("block");
    div.innerHTML = `
                <div class="modal-content text-light  bg-info">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn-close m-1" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img src="${data.players[0].strThumb?data.players[0].strThumb:"img/blankimg.jpg"}" class="rounded-circle bg-info mb-2" alt="" height="100" width="100">
                    <h5>${data.players[0].strPlayer?data.players[0].strPlayer:""}</h5>
                    <p>Nationality: <em class="fw-bold text-danger"> ${data.players[0].strNationality?data.players[0].strNationality:""}</em></p>
                    <p>Gender: <em class="fw-bold text-danger"> ${data.players[0].strGender?data.players[0].strGender:""}</em></p>
                    <p>${data.players[0].strDescriptionEN?data.players[0].strDescriptionEN:""}</p>
                    </div>

                </div>
          `
    singlePlayerView.appendChild(div)

}