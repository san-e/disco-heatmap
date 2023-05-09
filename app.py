from flask import Flask, current_app
import json
import requests
import os

app = Flask(__name__)

@app.route("/")
def index():
    return current_app.send_static_file("index.html")

@app.route("/playerAPI")
def api():
    def getPlayerlist():
            print("mogus")
            url = "https://discoverygc.com/forums/api_interface.php?action=players_online"
            cookies = {
            "mybbuser": os.environ.get("mybbuser"),
            }
            r = requests.get(url, cookies=cookies)
            if "You are either not logged in or do not have permission to view this page." in r.text:
                playerJSON = "{}"
            else:
                playerJSON = r.text.split('var json_data = JSON.parse("')[1].split('");</script>')[0].replace("\\", "")
            return json.loads(playerJSON)
    
    return getPlayerlist()