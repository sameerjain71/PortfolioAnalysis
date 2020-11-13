module.exports = class valuationObject
{
    
    myMap;

    constructor(position, valuationContext)
    {
        this.myMap = new Map() ;
        
        position.populateFieldsIntoMap(this.myMap) ;

        valuationContext.populateFieldsIntoMap(this.myMap) ;


    }
        
    addItem(key, value)
    {
        if (this.myMap.has(key))
        {
            this.myMap.delete(key) ;

        }
        this.myMap.set(key, value) ;
   }

     getItem(key)
     {
        let v ;
        if (this.myMap.has(key))
        {
            v = this.myMap.get(key) ;
        }
        return v ;
     }
     get(key)
     {
        let v  ;
        if (this.myMap.has(key))
        {
            v = this.myMap.get(key) ;
        }
        return v ;
     }
    
}

