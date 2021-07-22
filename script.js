const search = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const matchList = document.getElementById('matchList');

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
                match => `<h4>${match.name}<h4>`
            )
            .join('');
            
            console.log(html);
            matchList.innerHTML = html;
    }
};



searchBtn.addEventListener('click', () => searchCoins(search.value));

