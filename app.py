from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import pymongo
import json
from bson import json_util
from bson.json_util import dumps

app = Flask(__name__)


fields = {'title': True, 'time': True, 'num_comments': True, 'num_upvotes':True, 'upvote_ratio': True, 'link_flair':True, 'redditor':True, 'subreddit':True, 'post_date': True}



@app.route("/", methods=['GET'])
def home():
    mongo = pymongo.MongoClient("mongodb+srv://Jkalmus:KJeremy@cluster0.wecta.mongodb.net/retryWrites=true&w=majority")
    reddit_data = mongo.Reddit_DB.reddit_posts.find_one()
    mongo.close()
    return render_template("index.html", reddit_data=reddit_data)

@app.route("/data")
def get_data():
    mongo = pymongo.MongoClient("mongodb+srv://Jkalmus:KJeremy@cluster0.wecta.mongodb.net/retryWrites=true&w=majority")
    reddit_data = mongo.Reddit_DB.reddit_posts
    posts = reddit_data.find(projection=fields)
    
    json_reddit = []
    for data in posts:
        json_reddit.append(data)
    json_reddit = json.dumps(json_reddit,default=json_util.default)
    mongo.close()
    return json_reddit

if __name__ == "__main__":
    app.run(debug=True)




