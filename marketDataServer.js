const priceObj = require('./priceObj.js') ;
const lib = require('./utilities.js') ;

module.exports = class marketDataServer
{
    // prices is a map where key is symbol and value is an array
    // each array stores priceObj and is sorted by the field "time" in priceObj
    
    prices;

    constructor(file)
    {
        this.prices = new Map() ;
        
        let json = lib.readJsonFromFile(file) ;

//        console.log(json.length);

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
//        arr.sort(lib.comparePriceObjs) ;        
        arr.sort(comparePriceObjForDates) ;        
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
function comparePriceObjForDates(a, b) 
    {
        let timeA = a.get("time") ;
        let dateA = new Date(timeA) ;
        let timeB = b.get("time") ;
        let dateB = new Date(timeB) ;

        let comparison = 0 ;
        if (dateA .getTime()> dateB.getTime()) {
        comparison = 1;
        } else if (dateA .getTime() < dateB.getTime()) {
        comparison = -1;
        }
        return comparison;
    }
