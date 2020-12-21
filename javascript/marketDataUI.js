
function loadMarketDataFromFile(event)
{
    alert("market data loading from file") ;
    
    setupGrid() ;
    var file = fileToLoad() ;

    w2ui["marketDataGrid"].load(file);

}

function setupGrid()
{
                
    var cols = columnsForGrid() ;

    $(function () {

        $("#marketDataGrid").w2grid({
            name:"marketDataGrid",
            method: 'GET',

        });
                                
        w2ui["marketDataGrid"].columns = cols;
        w2ui["marketDataGrid"].refresh();

        });
    
    
}


function columnsForGrid()
{
    
    var cols = [
                    { field: 'symbol', caption: 'Symbol', size: '100px', resizable: true},
                    { field: 'price', caption: 'Price', size: '100px' ,resizable: true },
                    { field: 'price_time', caption: 'Price Time', size: '100px' , resizable: true }
                ] ;
    return cols ;
}


function fileToLoad()
{
    var file = "../json/prices.json" ;
    
    return file ;
}

 
function loadMarketDataFromServer(event)
{
    alert("loading market data from server") ;

    var data = getPortfolio().then(
    function(response) {
      if (response.statusCode !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
            
    var cols = columnsForAssetType("fix") ;
    
    console.log(data) ;
    
  //  console.log(cols) ;
                                
                $(function () {

                    $("#grid").w2grid({
                        name:"grid" ,
                //        url: 'fixcf.json',
                        method: 'GET',
//                        columns:cols,

                    });

    // set columns to be cols if the grid was already created before this method was called
                      w2ui["grid"].columns = cols;
                      w2ui["grid"].refresh();

      //              w2ui["grid"].load(file);

                    });


}

function getPortfolio()
{

const response = fetch('http://localhost:3000', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
});

console.log(response) ;
  return response;
}


