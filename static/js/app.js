

// var subreddit = 'wallstreetbets';

d3.selectAll("#selSub").on("change", updatePlotly);

function filterSub(subreddit_name, user_selection) {
    return subreddit_name === user_selection;       
}



function init(user_selection) {
    
        
        d3.json('/data').then(function(redditData){

            // console.log(redditData); 
        
       
        var filteredSub = redditData.filter(d => filterSub(d.subreddit, user_selection));
        // console.log(filteredSub);


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
    
    
}

function updatePlotly() {

    
    var dropdownMenu = d3.select('#selSub');
    var user_selection = dropdownMenu.property("value");
    // console.log(user_selection)
    
    init(user_selection);
    
}

var user_selection = 'wallstreetbets';

init(user_selection);

// init()


function filterAlpha(ticker_symbol, ticker) {
    
    return ticker_symbol === ticker;
}

function alpha(ticker) {
    console.log(ticker);
    d3.json('/alpha_data').then(function(alphaData){
        console.log(alphaData);


        var filteredTicker = alphaData.filter(s => filterAlpha(s.ticker, ticker));
        console.log(filteredTicker);

        var ticker = filteredTicker.map(stock => stock.ticker);
        console.log(ticker);
        var date = filteredTicker.map(stock => stock.date);
        var high = filteredTicker.map(stock => stock.high);
        var low = filteredTicker.map(stock => stock.low);
        var open = filteredTicker.map(stock => stock.open);
        var volume = filteredTicker.map(stock => stock.volume);
        var stockClose = filteredTicker.map(stock => stock.close);

        var alpha1 = {
            x: date,
            y: stockClose,
            type: "bar"
        };

        var alpha2 = {
            x: date,
            y: open,
            type: "bar"
        };

        var graphData = [alpha1, alpha2]

        var alphaLayout = {
            title: "Popular stocks",
            xaxis: {title: 'Date'},
            yaxis: {title: "Open/Close values"}
        };

        Plotly.newPlot('graph', graphData, alphaLayout)
    });
}



var ticker = 'GME'

alpha(ticker)

d3.selectAll("#stock").on("change", updateAlpha);
function updateAlpha() {

    
    var dropdownMenu = d3.select('#stock');
    var ticker = dropdownMenu.property("value");
    // console.log(ticker);
    
    alpha(ticker);
    
}




var comments_data = []
var dates = []

d3.json('/data').then(function(redditData){

    // console.log(redditData); 


    var filteredSub = redditData.filter(d => filterSub(d.subreddit, user_selection));
    var num_comments = filteredSub.map(post => post.num_comments);
    var post_date = filteredSub.map(post => post.post_date)

    comments_data.push(num_comments);
    dates.push(post_date);
});


var ticker_data = [];

d3.json('/alpha_data').then(function(alphaData){

    var filteredTicker = alphaData.filter(d => filterAlpha(d.ticker, ticker));
    var high = filteredTicker.map(stock => stock.high);

    ticker_data.push(high)


});


var options = {
    series: [{
//     name: 'Posts',
//     type: 'column',
//     data: comments_data
//   }, {
    name: 'Stock',
    type: 'line',
    data: ticker_data
  }],
    chart: {
    height: 350,
    type: 'line',
  },
  stroke: {
    width: [0, 4]
  },
  title: {
    text: 'Top Reddit Posts vs. Stock Price'
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1]
  },
  labels: dates,
  xaxis: {
    type: 'datetime'
  },
  yaxis: [{
    title: {
      text: 'Number of Upvotes',
    },
  
//   }, {
//     opposite: true,
//     title: {
//       text: 'Stock Price'
//     }
  }]
  };

  var chart = new ApexCharts(document.querySelector("#mixed-chart"), options);
  chart.render();