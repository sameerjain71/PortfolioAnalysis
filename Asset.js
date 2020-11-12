

class Asset
{
    sym,
    type,
    size,
    price,
    tradedate,
    currency,
    log:[]

    constructor(symbol, type, size, price, tradedate, currency)
    {
        this.sym = symbol || "none";
        this.type = type || "none";;
        this.size = size || 0;
        this.price = price || 0.0;
        this.tradedate = new Date(tradedate) ||Date.now() ;
        this.currency = currency ||"USD" ;
        
    }

}



function create(args) ;

function writeToJson)();

function readFromJson() ;

function constructor ;

function getValue(tag) ;


