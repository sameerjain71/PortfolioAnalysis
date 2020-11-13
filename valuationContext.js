module.exports = class valuationContext
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



    populateFieldsIntoMap(map)
    {
    for (let key of this.myMap.keys())
        {
            let value = this.myMap.get(key) ;
            map.set(key, value) ;
        
        }
    }
}
