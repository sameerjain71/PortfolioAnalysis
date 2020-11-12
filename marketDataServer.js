const priceObj = require('./priceObj.js') ;
const lib = require('./utilities.js') ;

module.exports = class marketDataServer
{
    
    prices;

    constructor(file)
    {
        this.prices = new Map() ;
        
        let json = lib.readJsonFromFile(file) ;

        console.log(json.length);

        for(let i=0;i<json.length;i++)
        {
            let ajson = json[i] ;
            console.log(ajson) ;
            let obj = new priceObj(ajson) ;
            this.addItem(obj.get('symbol'), obj) ;

        }
    }
   

    addItem(key, priceObj)
    {
        if (this.prices.has(key))
        {
            let arr = this.prices.get(key) ;
            this.insertPriceObj(arr, priceObj)
        }
        else
        {
            let arr = [] ;
            this.prices.set(key, arr) ;
            this.insertPriceObj(arr, priceObj) ;
        }
   }
    
    insertPriceObj(arr, priceObj)
    {
        arr.push(priceObj) ;
        arr.sort(lib.compare) ;        
    }
    
    
 convertToJSonString()
    {

        let tempArray = [];
//        console.log(this.prices.size) ;

        for (let key of this.prices.keys())
        {
            let anArray = this.prices.get(key);
            for (let j= 0; j<anArray.length; j++)
            {
                let anObj = anArray[j] ;
                tempArray.push(anObj.convertToObject()) ;
            }
        }
        return JSON.stringify(tempArray) ;
    }
}
