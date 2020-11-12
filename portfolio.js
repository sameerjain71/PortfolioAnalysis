const lib = require('./utilities.js') ;
const baseObject = require('./baseObject.js') ;

module.exports = class portfolio
{
    
    assets = [] ;
    

    constructor(file)
    {
        let json = lib.readJsonFromFile(file) ;

        console.log(json.length);

        for(let i=0;i<json.length;i++)
        {
            let ajson = json[i] ;
            console.log(ajson) ;
            let obj = new baseObject(ajson) ;
            this.assets.push(obj) ;

        }

    }


    convertToJSonString()
    {
        let tempArray = [];
        console.log(this.assets.length) ;

        for (let i=0;i<this.assets.length;i++)
        {
            let anObj = this.assets[i] ;
            tempArray.push(anObj.convertToObject()) ;
        }
        return JSON.stringify(tempArray) ;
    }

    
}

