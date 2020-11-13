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

function convertJsonToArray(json)
{
    let arr = [] ;
    
    for(let i=0;i<json.length;i++)
    {
        let ajson = json[i] ;
        let obj = new Map() ;
        
        for(let key in ajson)
        {
            let value = ajson[key] ;
            obj.set(key, value) ;
            arr.push(obj) ;
        }
    

    }
    
    return arr ;
}

module.exports = {readJsonFromFile, writeJsonToFile, convertJsonToArray}