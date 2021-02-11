#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, render_template,jsonify,redirect, url_for
import requests
import json
import os
import time
DEVELOPMENT_ENV  = True


app = Flask(__name__)

app_data = {
    "name":         "Fake news tracker -  Web App",
    "description":  "A basic Flask app using bootstrap for layout to represent the spread of fake news on social media",
    "author":       "FakeNewsTrack3",
    "html_title":   "Fake News Tracker",
    "project_name": "Fake News Tracker",
    "keywords":     "Flask, webapp, template, basic"
}

app.config['newdata'] = []

#Getting data from TWITTER
def auth():
    return os.environ.get("BEARER_TOKEN")

def create_url(query):
    tweet_fields = "tweet.fields=public_metrics,created_at,geo,lang,referenced_tweets,text"

    max_results = "max_results=100"
    url = "https://api.twitter.com/2/tweets/search/recent?query={}&{}&{}".format(
        query, tweet_fields, max_results
        )
    return url

#https://api.twitter.com/1.1/search/tweets.json?q=trump&result_type=popular

def create_id_url(query):
   
    tweet_fields = "tweet.fields=public_metrics,created_at,geo,lang,referenced_tweets,text"
    url = "https://api.twitter.com/2/tweets?ids={}&{}".format(
        query, tweet_fields
        )
    return url

def create_headers(bearer_token):
    headers = {"Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAEYbLwEAAAAA2QFmIRNmiAc3uEuMAPT9AoknvZw%3D7rtwFRPtWgSFp70bogE1sBP1WzqkR5cubh9vlN2COt9AiT6kfk"}
    return headers

def connect_to_endpoint(url, headers):
    response = requests.request("GET", url, headers=headers)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()

@app.route('/showinfo', methods=['GET', 'POST'])
def showinfo():
    if request.method == 'POST':
        querys = request.form.get('query')
        json_response = api_caller(querys)
    

        # New call to the the Twitter API that uses the ID of the retweeted tweets
        # ids = extract_retweets(json_response)
        # url_ids = create_id_url(ids)
        # json_response2 = connect_to_endpoint(url_ids, headers)
        
        # for item in json_response2["data"]:
        #     json_response["data"].append(item)
        
        app.config['newdata'] = json_response
        
        return redirect(url_for('testingJs'))
    print(app.config["newdata"])
    return json.dumps(app.config['newdata'])


def api_caller(query):
    
    bearer_token = auth()
    url = create_url(query)
    headers = create_headers(bearer_token)
    json_response = connect_to_endpoint(url, headers)

    time.time()
    count = 0
    while True:
        api_call = connect_to_endpoint(url, headers)
        for item in api_call["data"]:
            if item["id"] not in json_response["data"]:
                json_response["data"].append(item)
        
        time.sleep(2)
        count += 1
        print ("tick")
        if count == 3:
            count = 0
            break

    json_response_no_duplicates = remove_duplicates(json_response)
    return json_response_no_duplicates

def remove_duplicates(json_response):
    # id_list = []
    # json_response_copy = json_response.copy()
    # print(len(json_response_copy["data"]))
    # for i in range(len(json_response_copy["data"])):
    #     print(i)
    #     print(json_response_copy["data"][i]["id"])
    #     if json_response_copy["data"][i]["id"] not in id_list:
    #         id_list.append(json_response_copy["data"][i]["id"])
    #         print(len(json_response_copy["data"]))

    #     else:
    #         del json_response["data"][i]
           
    response_map = {}
    for i in range(len(json_response["data"])):
        key = json_response["data"][i]["id"] 
        value = json_response["data"][i]
        response_map[key] = value 
    print (response_map)
            
    return list(response_map.values())


def extract_retweets(json_response):
    id_list = []
    tweet_dict = json_response["data"]
    for i in range(len(tweet_dict)):
        if "referenced_tweets" in tweet_dict[i]:
            if tweet_dict[i]["referenced_tweets"][0]["type"] == "retweeted":
                if tweet_dict[i]["referenced_tweets"][0]["id"] not in id_list:
                    id_list.append(tweet_dict[i]["referenced_tweets"][0]["id"])
    joined_string = ",".join(id_list)
    return joined_string


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', app_data=app_data)


@app.route('/about')
def about():
    return render_template('about.html', app_data=app_data)


@app.route('/service')
def service():
    return render_template('service.html', app_data=app_data)


@app.route('/contact')
def contact():
    return render_template('contact.html', app_data=app_data)

@app.route('/testingJs')
def testingJs():
    return render_template('testingJs.html', app_data=app_data)


if __name__ == '__main__':
    app.run(debug=DEVELOPMENT_ENV)