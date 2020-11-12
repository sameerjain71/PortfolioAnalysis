
const portfolio = require('./portfolio.js') ;
const marketDataServer = require('./marketDataServer.js') ;

let p = new portfolio('./portfolio.json') ;
//let p = new portfolio('./temp.json') ;

console.log("------portfolio------") ;
console.log(p.convertToJSonString()) ;

let m = new marketDataServer('./temp.json') ;

console.log("------prices------") ;

console.log(m.convertToJSonString()) ;
