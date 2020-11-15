const lib = require('./utilities.js') ;
const asset = require('./asset.js') ;

module.exports = class portfolio
{
    
    assets = [] ;
    

    constructor(file)
    {
        let json = lib.readJsonFromFile(file) ;


        for(let i=0;i<json.length;i++)
        {
            let ajson = json[i] ;
            let obj = new asset(ajson) ;
            this.assets.push(obj) ;

        }

    }

    toArray()
    {
        return this.assets ;
    }

    convertToJSonString()
    {
        return JSON.stringify(this.assets) ;
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

