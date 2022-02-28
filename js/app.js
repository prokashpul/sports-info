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
sportsDataLoad('')

// show data in display
const playerDataDisplay = (data) => {
    console.log(data)
}