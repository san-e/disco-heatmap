from flask import Flask, current_app
import json
import requests
import os
import threading
import time

app = Flask(__name__)

playerlist = {}

def scrapePlayerlist():
        url = "https://discoverygc.com/forums/api_interface.php?action=players_online"
        cookies = {
        "mybbuser": os.environ.get("mybbuser"),
        }
        r = requests.get(url, cookies=cookies)
        if "You are either not logged in or do not have permission to view this page." in r.text:
            playerJSON = '{"error": "Couldn\'t get playerlist: Invalid login token"}'
        else:
            playerJSON = r.text.split('var json_data = JSON.parse("')[1].split('");</script>')[0].replace("\\", "")
        return json.loads(playerJSON)

def updatePlayerlist():
     global playerlist
     while True:
        playerlist = scrapePlayerlist()
        time.sleep(60)

thread = threading.Thread(target=updatePlayerlist)
thread.daemon = True
thread.start()




@app.route("/")
def index():
    return current_app.send_static_file("index.html")

@app.route("/player-api")
def api():
    return playerlist