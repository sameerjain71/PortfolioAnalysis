const valuationObject = require('./valuationObject.js') ;
const valuationContext= require('./valuationContext.js') ;
const equityValuationService = require('./equityValuationService.js') ;
const portfolio = require('./portfolio.js') ;
const pnlObject = require('./pnlObject.js') ;
const lib = require('./utilities.js') ;
const { dd_asset, dd_assettype, dd_pnl, dd_vc } = require('./data_dictionary.js') ;


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

            let assettype = position.get(dd_asset.ASSET_TYPE) ;

            
            switch (assettype)
            {
                    
                case dd_assettype.EQUITY:
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
    
    static runPnlSlides(p, jsonValStates, marketDataServer)
    {
        let valResultsArr = valuationServer.valuePortfolioForStates(p, jsonValStates, marketDataServer) ;
            
        
        let pnlSlideArr = [] ;

        
        for (let j=0;j<valResultsArr.length;j++)
        {
            let valArray = valResultsArr[j] ;
            
            let previousValObj ;
            
            let pnlSlide = [] ;

                    
            for (let i=0;i<valArray.length;i++)
            {
                if (j != 0)
                    previousValObj = valResultsArr[j-1][i] ;
                let currValObj = valArray[i] ;        
                let valTime = currValObj.get(dd_vc.VALUATION_TIME) ;
                let sym = currValObj.get(dd_asset.SYMBOL) ;
                let pnl ;
                let previousTV = 0 ;
                let curr = currValObj.get(dd_asset.CURRENCY);
                let  tv ;
                
                if (currValObj.get(dd_vc.TV) != undefined)
                     tv = currValObj.get(dd_vc.TV) ;

                if (previousValObj != undefined)
                {
                    previousTV = previousValObj.get(dd_vc.TV) ;
                }

                pnl = tv - previousTV ;

                let pnlObj = new pnlObject({}) ;


                pnlObj.addItem(dd_asset.SYMBOL, sym) ;
                pnlObj.addItem(dd_vc.VALUATION_TIME, valTime) ;
                pnlObj.addItem(dd_pnl.PREVIOUS_TV, previousTV) ;
                pnlObj.addItem(dd_pnl.CURRENT_TV, tv) ;
                pnlObj.addItem(dd_pnl.PNL, pnl) ;
                pnlObj.addItem(dd_asset.CURRENCY, curr) ;
                
                pnlSlide.push(pnlObj) ;
            }
            pnlSlideArr.push(pnlSlide) ;
        }
        
        return pnlSlideArr ;
    }

}
