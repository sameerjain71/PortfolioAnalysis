const priceObj = require('./priceObj.js') ;
const lib = require('./utilities.js') ;
const { dd } = require('./data_dictionary.js') ;


module.exports = class marketDataServer
{
    // prices is a map where key is symbol and value is an array
    // each array stores priceObj and is sorted by the field "time" in priceObj
    
    prices;

    constructor(file)
    {
        this.prices = {} ;
        
        let json = lib.readJsonFromFile(file) ;

//        console.log(json.length);

        for(let i=0;i<json.length;i++)
        {
            let ajson = json[i] ;
//            console.log(ajson) ;
            let obj = new priceObj(ajson) ;
            this.addItem(obj.get(dd.SYMBOL), obj) ;

        }
    }
   

    addItem(key, priceObj)
    {
        if (this.prices.hasOwnProperty(key))
        {
            let arr = this.prices[key] ;
            this.insertPriceObj(arr, priceObj)
        }
        else
        {
            let arr = [] ;
            this.prices[key] = arr ;
            this.insertPriceObj(arr, priceObj) ;
        }
   }
    
    getPriceArray(key)
    {
        let arr = [] ;
         if (this.prices.hasOwnProperty(key))
        {
            arr = this.prices[key];
        }
        return arr ;
    }
    
insertPriceObj(arr, priceObj)
    {
        arr.push(priceObj) ;
//        arr.sort(lib.comparePriceObjs) ;        
        arr.sort(comparePriceObjForDates) ;        
    }
    
    
 convertToJSonString()
    {

        return JSON.stringify(this.prices) ;
    }
    
priceObjFor(vObj)
{
    let price = -1;
    
    let date = vObj.get(dd.VALUATION_TIME);
    
    let symbol = vObj.get(dd.SYMBOL) ;
       
    let priceArray = this.getPriceArray(symbol) ;
    
    let priceObj = getPriceObjForDate(priceArray, date) ;
    
    return priceObj ;
}
    
}
function comparePriceObjForDates(a, b) 
    {
        let timeString = dd.PRICE_TIME ;
        let timeA = a.get(timeString) ;
        let dateA = new Date(timeA) ;
        let timeB =  b.get(timeString) ;
        let dateB = new Date(timeB) ;

        
        let comparison = 0 ;
        if (dateA .getTime()> dateB.getTime()) {
        comparison = 1;
        } else if (dateA .getTime() < dateB.getTime()) {
        comparison = -1;
        }
        return comparison;
    }

function getPriceObjForDate(priceArray, date)
{
    
        let theDate = new Date(date) ;
        let found = false ;
        let priceObj ;
        let length = priceArray.length ;
        let i = 0 ;
    
        while ((found === false) && i<length)
        {
            let anObj = priceArray[i] ;
            let priceObjDate = new Date(anObj.get(dd.PRICE_TIME)) ;
            if (priceObjDate.getTime()<= theDate.getTime())
            {
                priceObj = anObj ;
                i++ ;
                found = false ;
            }
            else
            {
                found = true ;
            }
            
        }
    
    return priceObj ;
    
}