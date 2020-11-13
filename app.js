
const portfolio = require('./portfolio.js') ;
const marketDataServer = require('./marketDataServer.js') ;
const valuationServer = require('./valuationServer.js') ;
const lib = require('./utilities.js') ;

// create a portfolio from a file
let p = new portfolio('./portfolio.json') ;
//let p = new portfolio('./temp.json') ;

console.log("------IMPLEMENT MARKET DATA SERVER PRICE FETCH IN EQUITY VALUATION SERVICE------") ;


console.log("------portfolio------") ;
console.log(p.convertToJSonString()) ;

// create a marketdataserver and populate it from a file
let m = new marketDataServer('./prices.json') ;

console.log("------prices------") ;
console.log(m.convertToJSonString()) ;

// create a valuation server

let jsonValuationStates = lib.readJsonFromFile("./valuationStates.json") ;
//
//console.log(jsonValuationStates) ;
//
let results = valuationServer.valuePortfolioForStates(p, jsonValuationStates, m) ;
//
console.log("------valuation------") ;

for(let i=0;i<results.length;i++)
{
    let state = results[i] ;
console.log(`----- state ${i} ------`) ;
    
    for(let j=0;j<state.length;j++)
    {
        let valObj = state[j] ;
        console.log(valObj) ;
    }
}

// value the portfolio at each state


