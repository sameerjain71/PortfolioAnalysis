const lib = require('./utilities.js') ;
const baseObject = require('./baseObject.js') ;

module.exports = class portfolio
{
    
    assets = [] ;
    

    constructor(file)
    {
        let json = lib.readJsonFromFile(file) ;


        for(let i=0;i<json.length;i++)
        {
            let ajson = json[i] ;
            let obj = new baseObject(ajson) ;
            this.assets.push(obj) ;

        }

    }

    toArray()
    {
        return this.assets ;
    }

    convertToJSonString()
    {
        let tempArray = [];

        for (let i=0;i<this.assets.length;i++)
        {
            let anObj = this.assets[i] ;
            tempArray.push(anObj.convertToObject()) ;
        }
        return JSON.stringify(tempArray) ;
    }

    length()
    {
        return this.assets.length ;
    }

    getPositionAtIndex(i)
    {
        return this.assets[i] ;
    }

    
}

