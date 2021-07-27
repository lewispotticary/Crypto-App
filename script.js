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
                    <h2>${match.name}</h2>
                    <h2 id="symbol">(${match.symbol})</h2>
                    <div id="${match.id}" onclick="addCrypto(this.id)">
                        <i class="fa fa-plus-square" aria-hidden="true"></i>
                    </div>
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

        var coinRank = coin.coingecko_rank;

        var coinLogo = coin.image.small;
        var coinName = coin.name;
        var coinSymbol = coin.symbol;
        coinSymbol = coinSymbol.toUpperCase();

        var coinPrice = coin.market_data.current_price.gbp;
        var coinChange24h = coin.market_data.price_change_percentage_24h;
        coinChange24h = Math.round(coinChange24h * 10) / 10
        var changeDirection = String(coinChange24h).charAt(0);

        var portfolioContainer = document.createElement('div');
        portfolioContainer.setAttribute('id','portfolioContainer');

        var portfolioRow1 = document.createElement('div');
        portfolioRow1.setAttribute('id','portfolioRow1');
        var coinRankText = document.createElement('span');
        coinRankText.setAttribute('id','spanRow1');
        coinRankText.innerText = 'Rank #' + coinRank;
        portfolioRow1.appendChild(coinRankText);

        var portfolioRow2 = document.createElement('div');
        portfolioRow2.setAttribute('id','portfolioRow2');
        var coinLogoText = document.createElement('IMG');
        coinLogoText.setAttribute('src', coinLogo);
        var coinNameText = document.createElement('span');
        coinNameText.innerText = coinName;
        var coinSymbolText = document.createElement('span');
        coinSymbolText.innerText = '('+ coinSymbol + ')';
        portfolioRow2.appendChild(coinLogoText);
        portfolioRow2.appendChild(coinNameText);
        portfolioRow2.appendChild(coinSymbolText);


        var portfolioRow3 = document.createElement('div');
        portfolioRow3.setAttribute('id','portfolioRow3'); 
        var coinPriceText = document.createElement('span');
        coinPriceText.innerText = '£'+ coinPrice;
        var coinChangeText = document.createElement('span');
        coinChangeText.innerText = coinChange24h + '%';
        if(changeDirection == '-'){
            coinChangeText.style.color = "red";
        }
        else{
            coinChangeText.style.color = "green";
        }


        portfolioRow3.appendChild(coinPriceText);
        portfolioRow3.appendChild(coinChangeText);

        portfolioContainer.appendChild(portfolioRow1);
        portfolioContainer.appendChild(portfolioRow2);
        portfolioContainer.appendChild(portfolioRow3);

        portfolio.appendChild(portfolioContainer);
    }();
}

searchBtn.addEventListener('click', () => searchCoins(search.value));

