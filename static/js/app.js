

// var subreddit = 'wallstreetbets';

d3.selectAll("#selSub").on("change", updatePlotly);

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
            y: stockClose,
            type: "bar"
        };

        var alpha2 = {
            x: date,
            y: open,
            type: "bar"
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
