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
    sportsDataLoad('')
})


// show data in display
const playerDataDisplay = (data) => {
    console.log(data.player)
    const players = document.getElementById('player-result');
    data.player.forEach(player => {
        console.log(player)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                    <img src="${player.strCutout?player.strCutout:"img/blankimg.jpg"}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
        `
        players.appendChild(div);
    })

}