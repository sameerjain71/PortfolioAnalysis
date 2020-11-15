const valuationObject = require('./valuationObject.js') ;
const valuationContext= require('./valuationContext.js') ;
const equityValuationService = require('./equityValuationService.js') ;
const portfolio = require('./portfolio.js') ;
const lib = require('./utilities.js') ;

module.exports = class valuationServer
{

    static valuePortfolio(p, valuationContext, marketDataServer)
    {
        let results = [] ;
        
                
        let portfolio = p.toArray() ;

        
        for (let i=0;i<portfolio.length;i++)
        {
            let position = portfolio[i];
            let vObj = new valuationObject({}) ;
            
//            console.log(position) ;
            position.addFieldsInto(vObj) ;
//            console.log(vObj) ;
         
            valuationContext.addFieldsInto(vObj) ;
//            console.log(vObj) ;

            let assettype = position.get('assettype') ;
            
            switch (assettype)
            {
                    
                case "equity":
                {
                    equityValuationService.value(vObj, valuationContext, marketDataServer) ;
                    break ;
                }
                default:
                {
                    
                }
            }

            results.push(vObj) ;
        }
        return results ;
        
    }
    
    static valuePortfolioForStates(p, jsonValStates, marketDataServer)
    {
        let resultsArr = [] ;
        
        let vStatesArr = lib.convertJsonToArray(jsonValStates) ;
        
        let vContextArr = [] ;

        for(let i=0;i<jsonValStates.length;i++)
        {
            let ajson = jsonValStates[i] ;
            let obj = new valuationContext(ajson) ;
            vContextArr.push(obj) ;
        }
                
        
        for(let i=0;i<vContextArr.length;i++)
        {
           let pResultsArr = valuationServer.valuePortfolio(p, vContextArr[i], marketDataServer) ;
        
            resultsArr.push(pResultsArr) ;
        }
        
        return resultsArr ;
    }
}
