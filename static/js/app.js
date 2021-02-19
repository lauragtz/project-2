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
        var subreddtit = redditData.map(post => post.subreddit);
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
