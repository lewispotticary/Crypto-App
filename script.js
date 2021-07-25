const search = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const matchList = document.getElementById('matchList');
const portfolio = document.getElementById('portfolio');

const searchCoins = async searchText =>{
    const res = await fetch('https://api.coingecko.com/api/v3/coins/list');
    const coins = await res.json();

    let matches = coins.filter(data => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return data.name.match(regex) || data.symbol.match(regex);
    });

    if(searchText.length == 0){
        matches = [];
        matchList.innerHTML = '';
    }

    console.log(matches);
    outputHtml(matches);

};

const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches
            .map(
                match => `
                <div class="card"
                    <h4>${match.name}</h4>
                    <h4 id="symbol">(${match.symbol})</h4>
                    <button class="addBtn" id="${match.id}" onclick="addCrypto(this.id)">Add</button>
                </div>
                `)
            .join('');
            
            console.log(html);
            matchList.innerHTML = html;
    }
};

function addCrypto (clicked_id){
    !async function(){
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${clicked_id}`);
        const coin = await res.json();
        console.log(coin);
    }();

}

searchBtn.addEventListener('click', () => searchCoins(search.value));

