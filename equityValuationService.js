const lib = require('./utilities.js') ;

module.exports = class equityValuationService
{

    static value(vObj, vContext, marketDataServer)
    {
        let price = marketDataServer.priceFor(vObj) ;
        let tv = -99999 ;
        
        vObj.addItem("price", price) ;
        
        let position = vObj.get('size')  ;
        
        if (price >0)
            tv = position * price ;
        
        vObj.addItem("tv", tv) ;
        
    }
}
