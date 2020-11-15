const valuationObject = require('./valuationObject.js') ;
const valuationContext= require('./valuationContext.js') ;
const equityValuationService = require('./equityValuationService.js') ;
const portfolio = require('./portfolio.js') ;
const lib = require('./utilities.js') ;
const { dd } = require('./data_dictionary.js') ;
const { asset_type } = require('./asset_type.js') ;


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
            
            position.addFieldsInto(vObj) ;
         
            valuationContext.addFieldsInto(vObj) ;

            let assettype = position.get(dd.ASSET_TYPE) ;

            
            switch (assettype)
            {
                    
                case asset_type.EQUITY:
                {
                    equityValuationService.value(vObj, marketDataServer) ;
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
