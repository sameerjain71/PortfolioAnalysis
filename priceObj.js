module.exports = class priceObj
{
    
    myMap;

    constructor(jsonObj)
    {
        this.myMap = new Map() ;
        for(let key in jsonObj)
        {
            let value = jsonObj[key] ;
            this.myMap.set(key, value) ;
            
        }
    }

    
    convertToObject()
    {
        
    const obj = Object.fromEntries(this.myMap);
    return obj ;

    }
    
    get(key)
    {
        return this.myMap.get(key) ;
    }
               
}
