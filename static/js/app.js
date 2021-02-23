function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

function init() {


    d3.json('/data').then(function(redditData){
        console.log(redditData);


        var titles = redditData.map(post => post.title);
        var flair = redditData.map(post => post.link_flair);
        var num_comments = redditData.map(post => post.num_comments);
        var num_upvotes = redditData.map(post => post.num_upvotes);
        var redditor = redditData.map(post => post.redditor);
        var subreddit = redditData.map(post => post.subreddit);
        var upvote_ratio = redditData.map(post => post.upvote_ratio);
            
        var trace1 = {
            x: titles,
            y: num_upvotes,
            type: "bar"
        };

        var trace2 = {
            x: titles,
            y: num_comments,
            type: "bar"
        };

        var data = [trace1, trace2 ]

        var layout = {
            title: "Popular Reddit Investing Sites",
            xaxis: {title: 'Posts'},
            yaxis: {title: "Upvotes"}
        };

        Plotly.newPlot('chart', data, layout)

            

        

        }); 
}

function filterSub(redditData, subreddit) {
    
    return redditData.subreddit == subreddit
}


init()

function alpha() {
    d3.json('/alpha_data').then(function(alphaData){
        console.log(alphaData);

        var ticker = alphaData.map(stock => stock.ticker);
        var date = alphaData.map(stock => stock.date);
        var high = alphaData.map(stock => stock.high);
        var low = alphaData.map(stock => stock.low);
        var open = alphaData.map(stock => stock.open);
        var volume = alphaData.map(stock => stock.volume);
        var stockClose = alphaData.map(stock => stock.close);

        var alpha1 = {
            x: date,
            y: open,
            type: "line"
        };

        var alpha2 = {
            x: date,
            y: stockClose,
            type: "line"
        };

        var graphData = [alpha1, alpha2 ]

        var alphaLayout = {
            title: "Popular stocks",
            xaxis: {title: 'Date'},
            yaxis: {title: "Open/Close values"}
        };

        Plotly.newPlot('graph', graphData, alphaLayout)
    });
}
function filterAlpha(alphaData, ticker) {
    
    return alphaData.ticker == ticker

}
alpha()