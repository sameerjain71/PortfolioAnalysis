
const portfolio = require('./portfolio.js') ;
const marketDataServer = require('./marketDataServer.js') ;


// create a portfolio from a file
let p = new portfolio('./portfolio.json') ;
//let p = new portfolio('./temp.json') ;

console.log("------portfolio------") ;
console.log(p.convertToJSonString()) ;

// create a marketdataserver and populate it from a file
let m = new marketDataServer('./prices.json') ;

console.log("------prices------") ;
console.log(m.convertToJSonString()) ;
