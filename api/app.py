from flask import Flask, current_app
from collections import defaultdict
import json
import requests
import os

app = Flask(__name__)

@app.route("/")
def index():
    return current_app.send_static_file("index.html")

@app.route("/player-api")
def api():
    def getPlayerlist():
            url = f"https://api.discoverygc.com/api/Online/GetPlayers/{os.environ.get('discovery_api_key')}"
            r = requests.get(url)

            systems = defaultdict(int)
            for player in r.json().get("players"):
                systems[player.get("system")] += 1


            return json.dumps(systems)
    
    return getPlayerlist()