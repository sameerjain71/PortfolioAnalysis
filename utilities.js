const fs = require('fs');

function writeJsonToFile(file, json)
{
const fs = require('fs') ;

const jsonString = JSON.stringify(json)
fs.writeFile(file, jsonString, err => 
{
    if (err) 
    {
        console.log(`Error writing file ${file}`, err)
    } 
    else 
    {
        console.log(`Successfully wrote file ${file}`) ;
    }
})
}

function readJsonFromFile(file)
{

let rawdata = fs.readFileSync(file);
let jsonObj = JSON.parse(rawdata);
//console.log(jsonObj);

return jsonObj ;
    
    
}

//function comparePriceObjs(a, b) 
//    {
//      let timeA = a.get("time") ;
//    let dateA = new Date(timeA) ;
//      let timeB = b.get("time") ;
//    let dateB = new Date(timeB) ;
//
//      let comparison = 0 ;
//      if (dateA .getTime()> dateB.getTime()) {
//        comparison = 1;
//      } else if (dateA .getTime() < dateB.getTime()) {
//        comparison = -1;
//      }
//      return comparison;
//    }

module.exports = {readJsonFromFile, writeJsonToFile}