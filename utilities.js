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
    
    
}

function findObjInArrayForField(valuationArray, field, value)
{
    let count = valuationArray.length ;
    let returnObj ;
    
    for(let i=0;i<count;i++)
    {
        let anObj = valuationArray[i] ;
                
        if (anObj.get(field) == value)
        {
            returnObj = anObj ;
            break ;
        }
    }
    return returnObj ;
    
}

module.exports = {readJsonFromFile, writeJsonToFile, convertJsonToArray, findObjInArrayForField}