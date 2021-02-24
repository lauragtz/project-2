from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import pymongo
import json
from bson import json_util
from bson.json_util import dumps
from config import mongo_username
from config import mongo_password

app = Flask(__name__)



fields = {'title': True, 'time': True, 'num_comments': True, 'num_upvotes':True, 'upvote_ratio': True, 'link_flair':True, 'redditor':True, 'subreddit':True, 'post_date': True}
alpha_fields = {'_id': False}

@app.route("/", methods=['GET'])
def home():
    mongo = pymongo.MongoClient(f"mongodb+srv://{mongo_username}:{mongo_password}@cluster0.wecta.mongodb.net/retryWrites=true&w=majority")
    reddit_data = mongo.Reddit_DB.reddit_posts.find_one()
    mongo.close()
    return render_template("index.html", reddit_data=reddit_data)

@app.route("/data")
def get_data():
    mongo = pymongo.MongoClient(f"mongodb+srv://{mongo_username}:{mongo_password}@cluster0.wecta.mongodb.net/retryWrites=true&w=majority")
    reddit_data = mongo.Reddit_DB.reddit_posts
    posts = reddit_data.find(projection=fields)
    
    json_reddit = []
    for data in posts:
        json_reddit.append(data)
    json_reddit = json.dumps(json_reddit,default=json_util.default)
    mongo.close()
    return json_reddit

@app.route("/alpha", methods=['GET'])
def alpha_home():
    mongo = pymongo.MongoClient(f"mongodb+srv://{mongo_username}:{mongo_password}@cluster0.wecta.mongodb.net/retryWrites=true&w=majority")
    alpha_data = mongo.alpha_db.alpha_data.find_one()
    mongo.close()
    return render_template("index.html", alpha_data=alpha_data)


@app.route("/alpha_data")
def get_alpha_data():
    mongo = pymongo.MongoClient(f"mongodb+srv://{mongo_username}:{mongo_password}@cluster0.wecta.mongodb.net/retryWrites=true&w=majority")
    alpha_data = mongo.alpha_db.alpha_data
    alpha_posts = alpha_data.find(projection=alpha_fields)

    json_alpha = []
    for data in alpha_posts:
        json_alpha.append(data)
    json_alpha = json.dumps(json_alpha,default=json_util.default)
    mongo.close()
    return json_alpha

if __name__ == "__main__":
    app.run(debug=True)
