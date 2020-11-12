

module.exports = class baseObject
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
           

    addItem(key, value)
    {
        if (myMap.has(key))
        {
            myMap.delete(key) ;

        }
        myMap.set(key, value) ;
   }
    
}
