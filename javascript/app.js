
const portfolio = require('./portfolio.js') ;
const marketDataServer = require('./marketDataServer.js') ;
const valuationServer = require('./valuationServer.js') ;
const lib = require('./utilities.js') ;


var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var port = process.env.PORT || 3000;        // set our port

var router = express.Router();              // get an instance of the express Router

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//router.get('', function(req, res) {
//    res.json({ message: 'hooray! connection made' });   
//    
//    const response = {
//        statusCode: 200,
//        headers: {
//            "Access-Control-Allow-Headers" : "Content-Type",
//            "Access-Control-Allow-Origin": "*",
//            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
//        },
//        body: JSON.stringify('Connection successful!'),
//    };
//    console.log("INSIDE GET") ;
//    return response ;
//});



app.get('/valuePortfolioForGrid', (request, response) => {
  response.status(200);
    
    
console.log("------IMPLEMENT MARKET DATA SERVER PRICE FETCH IN EQUITY VALUATION SERVICE------") ;

// create a portfolio from a file
let p = new portfolio('../json/portfolio.json') ;

console.log("------portfolio------") ;
console.log(p.convertToJSonString()) ;

// create a marketdataserver and populate it from a file
let m = new marketDataServer('../json/prices.json') ;

console.log("------prices------") ;
console.log(m.convertToJSonString()) ;

// create a valuation server

let jsonValuationStates = lib.readJsonFromFile("../json/valuationStateSingle.json") ;
    

//
//console.log(jsonValuationStates) ;
//
let resultsArray = valuationServer.valuePortfolioForStates(p, jsonValuationStates, m) ;
let total;
//
console.log("------valuation------") ;

for(let i=0;i<resultsArray.length;i++)
{
    let state = resultsArray[i] ;
console.log(`----- state ${i} ------`) ;
    total = state.length ;
    for(let j=0;j<state.length;j++)
    {
        let valObj = state[j] ;
        console.log(valObj) ;
    }

  let results = {} ;
    
  results["status"] = "success" ;
  results["total"] = total ;
  
  let records = [] ;
  for (i=0;i<total;i++)
  {
     let valObj = state[i] ;
     let aJson = {} ;
     aJson["recid"] = i ;
     valObj.json(aJson) ;
     records.push(aJson) ;    
  }
    
  results["records"] = records ;
  console.log(results) ;
  response.json(results) ;
    
};

}) ;

app.listen(port);
console.log('Magic happens on port ' + port);
