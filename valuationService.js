const lib = require('./utilities.js') ;
const { dd } = require('./data_dictionary.js') ;

module.exports = class valuationService
{

    static value(vObj, marketDataServer)
    {
        let priceObj = marketDataServer.priceObjFor(vObj) ;
        let tv = -99999 ;
        
        
        let price = -1 ;
        let price_time = "1/1/1900";

        
        if (priceObj != undefined)
        {
            price_time = priceObj.get(dd.PRICE_TIME);
            price = priceObj.get(dd.PRICE) ;
        }

        vObj.addItem(dd.PRICE, price) ;
        vObj.addItem(dd.PRICE_TIME, price_time) ;

        
        let position = vObj.get(dd.SIZE)  ;
        
        if (price >0)
            tv = position * price ;
        
        vObj.addItem(dd.TV, tv) ;
                        
    }
}
