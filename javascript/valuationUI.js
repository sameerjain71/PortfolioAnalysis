//  loading from file
//
//function valuePortfolio(event)
//{
//    alert("valuing portfolio") ;
//    
//    setupGrid() ;
//    var file = fileToLoad() ;
//
//    w2ui["valuationGrid"].load(file);
//
//}
//
//function setupGrid()
//{
//                
//    var cols = columnsForGrid() ;
//
//    $(function () {
//
//        $("#valuationGrid").w2grid({
//            name:"valuationGrid",
//            method: 'GET',
//
//        });
//                                
//        w2ui["valuationGrid"].columns = cols;
//        w2ui["valuationGrid"].refresh();
//
//        });
//    
//    
//}
//
//
//function columnsForGrid()
//{
//    
//    var cols = [
//        { field: 'valuation_time', caption: 'Valuation Time', size: '100px', resizable: true}]
//            
//    return cols ;
//}
//
//
//function fileToLoad()
//{
//    var file = "../json/valuationStates.json" ;
//    
//    return file ;
//}


function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}

function fetchResults()
    {
        const results =  fetch('http://localhost:3000/valuePortfolio')    
        .then(response =>response.json())
        .then(data=> {
        console.log('Request succeeded with JSON response \n', data);
      }).catch(error=> {
        console.log('Request failed \n', error);
      });
        
      return results ;
    }



function valuePortfolio(event)
{

    alert("valuing portfolio") ;
    
    $(function () {

        $("#valuationGrid").w2grid({
            name:"valuationGrid",
            method:"GET",
            columns: [				
                { field: 'recid', caption: 'ID', size: '50px', hidden:"true" },
                { field: 'asset_type', caption: 'Asset Type', size: '100%', resizable: true},
                { field: 'currency', caption: 'Currency', size: '100%', resizable: true},
                { field: 'price', caption: 'Price', size: '100%', resizable: true},
                { field: 'tv', caption: 'TV', size: '100%', resizable: true},
                { field: 'size', caption: 'Size',size: '100%', resizable: true},
                { field: 'price_time', caption: 'Price Time', size: '100%', resizable: true},
                { field: 'symbol', caption: 'Symbol', size: '100%', resizable: true},
                { field: 'trade_date', caption: 'Trade Date', size: '100%', resizable: true},
                { field: 'valuation_time', caption: 'Valuation Time', size: '100%', resizable: true}
	               ],
	onLoad: function(event) {
		console.log(event);
	}	
            
    });
        w2ui["valuationGrid"].refresh();
        w2ui["valuationGrid"].load("http://localhost:3000/valuePortfolioForGrid");

    }) ;
}


