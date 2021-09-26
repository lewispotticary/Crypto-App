//Storing HTML elements into variables

const search = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const matchList = document.getElementById('matchList');
const portfolio = document.getElementById('portfolio');

//When search button clicked run searchCoins function and pass search value to searchCoins function

searchBtn.addEventListener('click', () => searchCoins(search.value));

//searchCoins function fetches and returns relevant coins the user has searched for. 

const searchCoins = async searchText =>{

    //Fetch data from coingecko API and store in response variable

    const res = await fetch('https://api.coingecko.com/api/v3/coins/list');

    //Store response as json format into coins variable

    const coins = await res.json();

    //Filters coingecko fetch by the users input. Returns the names and symbols that match and stores in variable called matches

    let matches = coins.filter(data => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return data.name.match(regex) || data.symbol.match(regex);
    });

    //If searchText is null then set matches array to empty and make sure matchList display nothing

    if(searchText.length == 0){
        matches = [];
        matchList.innerHTML = '';
    }

    //Run outputHTML function and pass matches variable 

    outputHtml(matches);

};

//OutputHTML function outputs the coins that the user has searched for into a list

const outputHtml = matches => {

    //If there is a match run code

    if(matches.length > 0){

        //Maps through each match from json data and put data into a div where it is formatted. This data then is joined and stored in html variable

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
            
            //html data is put into matchList div
            
            matchList.innerHTML = html;
    }
};

//addCrypto function adds a coin from the matchList to portfolio div when a user clicks the add button

function addCrypto (clicked_id){

    //Async function, will return a promise

    !async function(){

        //Fetch data from coingecko API by the ID of the added coin

        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${clicked_id}`);

        //Store response as json format into coin variable

        const coin = await res.json();

        //Storing the attributes of the selected coin into seperate variables and manipulating data

        var coinRank = coin.coingecko_rank;
        var coinLogo = coin.image.small;
        var coinName = coin.name;
        var coinSymbol = coin.symbol;
        coinSymbol = coinSymbol.toUpperCase();
        var coinPrice = coin.market_data.current_price.gbp;
        var coinChange24h = coin.market_data.price_change_percentage_24h;
        coinChange24h = Math.round(coinChange24h * 10) / 10
        var changeDirection = String(coinChange24h).charAt(0);

        //Creating div to contain data

        var portfolioContainer = document.createElement('div');
        portfolioContainer.setAttribute('id','portfolioContainer');

        //Creating div for row 1 and creating span for data

        var portfolioRow1 = document.createElement('div');
        portfolioRow1.setAttribute('id','portfolioRow1');
        var coinRankText = document.createElement('span');
        coinRankText.setAttribute('id','spanRow1');
        coinRankText.innerText = 'Rank #' + coinRank;
        portfolioRow1.appendChild(coinRankText);

        //Creating div for row 2 and creating image element and span for data

        var portfolioRow2 = document.createElement('div');
        portfolioRow2.setAttribute('id','portfolioRow2');
        var coinLogoText = document.createElement('IMG');
        coinLogoText.setAttribute('src', coinLogo);
        var coinNameText = document.createElement('span');
        coinNameText.innerText = coinName;
        var coinSymbolText = document.createElement('span');
        coinSymbolText.innerText = '('+ coinSymbol + ')';

        //Append data to created div, img and span elements 

        portfolioRow2.appendChild(coinLogoText);
        portfolioRow2.appendChild(coinNameText);
        portfolioRow2.appendChild(coinSymbolText);

        //Creating div for row 3 and span for data

        var portfolioRow3 = document.createElement('div');
        portfolioRow3.setAttribute('id','portfolioRow3'); 
        var coinPriceText = document.createElement('span');
        coinPriceText.innerText = '£'+ coinPrice;
        var coinChangeText = document.createElement('span');
        coinChangeText.innerText = coinChange24h + '%';

        //If the coin direction is equal to minus then set coin change text to red, else set to green

        if(changeDirection == '-'){
            coinChangeText.style.color = "red";
        }
        else{
            coinChangeText.style.color = "green";
        }

        //Append data to row 3 div

        portfolioRow3.appendChild(coinPriceText);
        portfolioRow3.appendChild(coinChangeText);

        //Append all rows to portfolio container

        portfolioContainer.appendChild(portfolioRow1);
        portfolioContainer.appendChild(portfolioRow2);
        portfolioContainer.appendChild(portfolioRow3);

        //Append portfolio container to main portfolio div

        portfolio.appendChild(portfolioContainer);
    }();
}