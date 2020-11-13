const lib = require('./utilities.js') ;

module.exports = class equityValuationService
{

    static value(vObj, vContext)
    {
        let price = 1.3 ;
        let position = vObj.getItem('size')  ;
        let tv = position * price ;
        
        vObj.addItem("tv", tv) ;
        
    }
}
