
const configuration = {
    method: 'GET',
      url: 'https://yfapi.net/v11/finance/quoteSummary/AAPL',
      params: {modules: 'defaultKeyStatistics,assetProfile'},
       headers: {
        'x-api-key': 'ASGY3lFJ2emnqyL3iCDe4GLQv6tj35c2COyJUOYc'  
}
};

$('form').on('submit', (event) => {
    event.preventDefault();
    const userInput = $('input[type="text"]').val();
fetch(`https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=`+ userInput, configuration)
.then(function(response){
    return response.json();
}
)
.then(function(stocks) {
    $('#Price').html(stocks.quoteResponse.result[0].regularMarketPrice);
   $('#Name').html(stocks.quoteResponse.result[0].displayName);
   $('#PE').html(stocks.quoteResponse.result[0].trailingPE);
    console.log(stocks)
    //console.log(stocks.quoteResponse.result[0].language)
    //stocks.quoteResponse.result.forEach(stock => stocksList(stock)
})
.catch(function(error) {
    alert("Well This Isn't good");
    console.log(error.message)
});
})

$('button').on('click', (event) => {
    event.preventDefault();
fetch(`https://yfapi.net/v1/finance/trending/US`, configuration)
.then(function(response){
    return response.json();
}
)
.then(function(stocks) {
    const randomStock= stocks.finance.result[0].quotes[Math.floor(Math.random()*stocks.finance.result[0].quotes.length)]
  
  $('#trending').html(randomStock.symbol)
    console.log(randomStock.symbol)
    fetch(`https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=`+ randomStock.symbol, configuration)
.then(function(response){
    return response.json();
}
)
.then(function(stocks) {
    $('#Price').html(stocks.quoteResponse.result[0].regularMarketPrice);
   $('#Name').html(stocks.quoteResponse.result[0].longName);
   $('#PE').html(stocks.quoteResponse.result[0].trailingPE);
   
})
.catch(function(error) {
    alert("Well This Isn't good");
    console.log(error.message)
});
})
.catch(function(error) {
    alert("Well This also not good");
    console.log(error.message)
});
})