

module.exports = class baseObject
{
    
    myMap;

    constructor(jsonObj)
    {
        this.myMap = jsonObj ;
    }

    
//    convertToObject()
//    {
//        
//    const obj = Object.fromEntries(this.myMap);
//    return obj ;
//
//    }
               
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
//    console.log(this.myMap) ;

    for (let key in this.myMap)
        {
//            console.log(key) ;
            let value = this.myMap[key] ;
            target.addItem(key, value);
        
        }
    }

}
