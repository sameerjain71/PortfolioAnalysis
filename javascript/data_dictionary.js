
const dd_asset = {
    
    ASSET_TYPE : "asset_type",
    SYMBOL : "symbol",
    TRADED_PRICE : "traded_price",
    SIZE : "size",
    TRADE_DATE : "trade_date",
    TRADED_PRICE : "traded_price",
    CURRENCY : "currency",
} ;

const dd_vc = {

    TV : "tv", 
    VALUATION_TIME : "valuation_time"
} ;

const dd_price = {

    PRICE : "price",
    PRICE_TIME : "price_time"
} ;

const dd_assettype = {

    EQUITY : "equity",
    BOND : "bond",
    CDS_INDEX : "cds_index",
    BOND_FUTURE : "bond_future",
    REAL_ESTATE_SECURITY : "res"
} ;

const dd_pnl = {

     PREVIOUS_TV: "previous_tv",
    CURRENT_TV : "current_tv",
    PNL : "pnl"
} ;

const dd_rebalancing = {
    
    REBALANCING_DATE: "rebalancing_date",
    REBALANCING_AXIS: "rebalancing_axis",
    REBALANCING_METHOD: "rebalancing_method",
    REBALANCING_PORTFOLIO_PERCENTAGE: "rebalacing_portfolio_percentage"
    
} ;

module.exports = { dd_asset, dd_vc, dd_price, dd_assettype, dd_pnl, dd_rebalancing };
