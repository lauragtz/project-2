

// var subreddit = 'wallstreetbets';

d3.selectAll("#selSub").on("change", updatePlotly);
d3.selectAll("#stock").on("change", updateStock);
function filterSub(subreddit_name, user_selection) {
    return subreddit_name === user_selection;       
}

function init(user_selection) {
    console.log('enter');
        
        d3.json('/data').then(function(redditData){

            console.log(redditData); 
        
       
        var filteredSub = redditData.filter(d => filterSub(d.subreddit, user_selection));
        console.log(filteredSub);


        var titles = filteredSub.map(post => post.title);
        var flair = filteredSub.map(post => post.link_flair);
        var num_comments = filteredSub.map(post => post.num_comments);
        var num_upvotes = filteredSub.map(post => post.num_upvotes);
        var redditor = filteredSub.map(post => post.redditor);
        var subreddit = filteredSub.map(post => post.subreddit);
        var upvote_ratio = filteredSub.map(post => post.upvote_ratio);
        var post_date = filteredSub.map(post => post.post_date)
        


            
        var trace1 = {
            x: post_date,
            y: num_upvotes,
            type: "bar",
            text: titles
        };


        var data = [trace1]


        var layout = {
            title: "Popular Reddit Investing Sites",
            xaxis: {title: 'Posts'},
            yaxis: {title: "Upvotes"}
        };

        Plotly.newPlot('chart', data, layout)
        
    });
    console.log('exit');
}

function updatePlotly() {

    
    var dropdownMenu = d3.select('#selSub');
    // console.log(dropdownMenu.property("value"));
    var user_selection = dropdownMenu.property("value");
    console.log(user_selection)
    
    init(user_selection);
    
}



var user_selection = 'wallstreetbets';

init(user_selection);

function filterStock(stock_name, stock_selection) {
    return stock_name === stock_selection;       
}
function alpha(stock_selection) {
    d3.json('/alpha_data').then(function(alphaData) {
        console.log(alphaData);

    var filteredStock = alphaData.filter(s => filterStock(s.ticker, stock_selection));
    console.log(filteredStock);

    var ticker = filteredStock.map(stock => stock.ticker);
    var close_date = filteredStock.map(stock => stock.date);
    var high = filteredStock.map(stock => stock.high);
    var low = filteredStock.map(stock => stock.low);
    var open = filteredStock.map(stock => stock.open);
    var volume = filteredStock.map(stock => stock.volume);
    var stockClose = filteredStock.map(stock => stock.close);

    var alpha1 = {
        x: close_date,
        y: stockClose,
        type: "bar"
    };

    var graphData = [alpha1]

    var alphaLayout = {
        title: "Popular stocks",
        xaxis: {title: 'Date'},
        yaxis: {title: "Closing values"}
    };

    Plotly.newPlot('graph', graphData, alphaLayout)
    });
}
function updateStock() {

    
    var dropdownStock = d3.select('#stock');
    var stock_selection = dropdownStock.property("value");
    console.log(stock_selection)
    
    alpha(stock_selection);
    
}

var stock_selection = 'GME';

alpha(stock_selection);