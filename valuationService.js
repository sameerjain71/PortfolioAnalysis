const lib = require('./utilities.js') ;
const { dd_asset, dd_price, dd_vc } = require('./data_dictionary.js') ;

module.exports = class valuationService
{

    static value(vObj, marketDataServer)
    {
        let priceObj = marketDataServer.priceObjFor(vObj) ;
        let tv  ;
        
        
        let price = undefined ;
        let price_time = undefined;

        
        if (priceObj != undefined)
        {
            price_time = priceObj.get(dd_price.PRICE_TIME);
            price = priceObj.get(dd_price.PRICE) ;
        }

        vObj.addItem(dd_price.PRICE, price) ;
        vObj.addItem(dd_price.PRICE_TIME, price_time) ;

        
        let position = vObj.get(dd_asset.SIZE)  ;
        
        if (price >0)
            tv = position * price ;
        
        vObj.addItem(dd_vc.TV, tv) ;
                        
    }
}
