
const portfolio = require('./portfolio.js') ;

let p = new portfolio('./portfolio.json') ;
//let p = new portfolio('./temp.json') ;

console.log(p.convertToJSonString()) ;

