

module.exports = class baseObject
{
    
    myMap;

    constructor(jsonObj)
    {
        this.myMap = jsonObj ;
    }

                   
    addItem(key, value)
    {
        if (this.myMap.hasOwnProperty(key))
        {
            delete this.myMap[key] ;

        }
        this.myMap[key] = value  ;
   }

    get(key)
     {
        let v  ;
        if (this.myMap.hasOwnProperty(key))
        {
            v = this.myMap[key] ;
        }
        return v ;
     }
    
    addFieldsInto(target)
    {
        // iterate over fields and add to target

    for (let key in this.myMap)
        {
            let value = this.myMap[key] ;
            target.addItem(key, value);
        
        }
    }
    
    json(target)
    {
        
        
        for (let key in this.myMap)
        {
            let value = this.myMap[key] ;
            target[key] = value ;
        
        }
        return target ;
    }

}
