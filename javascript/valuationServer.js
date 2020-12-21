const valuationObject = require('./valuationObject.js') ;
const valuationContext= require('./valuationContext.js') ;
const equityValuationService = require('./equityValuationService.js') ;
const portfolio = require('./portfolio.js') ;
const pnlObject = require('./pnlObject.js') ;


const lib = require('./utilities.js') ;
const { dd_asset, dd_assettype, dd_pnl, dd_vc, dd_rebalancing, dd_price } = require('./data_dictionary.js') ;


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
    
    static runRebalancingForTimeSeries(p, rebalancing_file, marketDataServer)
    {
        
        let valuationStatesArray = [] ;
        let rebalancing_instructions = lib.readJsonFromFile(rebalancing_file) ;
      
        let count = rebalancing_instructions.length ;
        
//        console.log(rebalancing_instructions) ;
                
        for (let i=0;i<count;i++)
        {
        
            let valuation_array ;
                            
            let an_instr = rebalancing_instructions[i] ;
            
            let time = an_instr[dd_rebalancing.REBALANCING_DATE] ;
            
            let vc = new valuationContext({}) ;
            
            vc.addItem(dd_vc.VALUATION_TIME, time) ;
            
            valuation_array = valuationServer.valuePortfolio(p, vc, marketDataServer) ;
            valuationStatesArray.push(valuation_array) ;
            
            
            valuationServer.rebalancePortfolio(p, valuation_array, an_instr) ;
        }
    }
    static rebalancePortfolio(p, valuationArray, rebalancing_instr)
    {
        let count = valuationArray.length ;
        let portfolioValue = 0 ;
        let valDate = rebalancing_instr[dd_rebalancing.REBALANCING_DATE] ;
        let instrArray = rebalancing_instr[dd_rebalancing.REBALANCING_AXIS] ;

        for (let i=0;i<count;i++)
        {
            let valObj = valuationArray[i] ;
            let tv = valObj.get(dd_vc.TV) ;
            if (tv != undefined)
                portfolioValue = portfolioValue+tv ;
        }
                
        let portfolio = p.toArray() ;
        count = portfolio.length ;

        for (let i=0;i<count;i++)
        {
            let position = portfolio[i] ;
            let sym = position.get(dd_asset.SYMBOL) ;
            let currentSize = position.get(dd_asset.SIZE) ;
            
//            console.log(instrArray) ;

            let an_instr = findObjInstructionArrayMatchingField(instrArray, dd_asset.SYMBOL, sym) ;
            
//            console.log(an_instr) ;
            
//            let instr_axis = an_instr[dd_rebalancing.REBALANCING_AXIS] ;
            
        //     let sym_instr = findObjInstructionArrayMatchingField(instr_axis, dd_asset.SYMBOL, sym) ;

            let rebalancing_method = an_instr[dd_rebalancing.REBALANCING_METHOD] ;
    
            let valObj = lib.findObjInArrayForField(valuationArray, dd_asset.SYMBOL, sym) ;
            
//            console.log(sym) ;
//            console.log(valObj) ;
//            console.log(rebalancing_method) ;

            switch (rebalancing_method)
            {
                case "total_capitalization":
                {
                    console.log(position) ;

                    let desiredPercentage = an_instr[dd_rebalancing.REBALANCING_PORTFOLIO_PERCENTAGE] ;
                    let currentPrice = valObj.get(dd_price.PRICE) ;
                    let desiredTV = (portfolioValue*(desiredPercentage)) ;
                    let desiredSize = desiredTV/currentPrice ;
                    position.addItem(dd_asset.SIZE, desiredSize) ;
                    position.addItem(dd_asset.TRADED_PRICE, currentPrice) ;
                    position.addItem(dd_asset.TRADE_DATE, valDate) ;
                    
//                    console.log(valObj) ;
                      console.log(`portfolio value ${portfolioValue}`) ;
                      console.log(`value date ${valDate}`) ;
                      console.log(an_instr) ;

//                    console.log(desiredPercentage) ;
//                    console.log(currentPrice) ;
//                    console.log(desiredTV) ;
//                    console.log(desiredSize) ;
                    
                    console.log(position) ;
                    console.log("------------") ;

                    
                    break ;
                }
            default:
            {
                break ;
            }
                
            }
            

        }


    }
        // rebalance the portfolio at each valuation slice
        // Pnl between valuation states 
        

}

function findObjInstructionArrayMatchingField(instr_array, field, value)
{
    let count = instr_array.length ;
    let returnObj ;
    
    for(let i=0;i<count;i++)
    {
        let anObj = instr_array[i] ;
                
        if (anObj[field] == value)
        {
            returnObj = anObj ;
            break ;
        }
    }
    return returnObj ;
    
}
