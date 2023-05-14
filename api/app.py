from flask import Flask, current_app, jsonify
import json
from collections import defaultdict
import requests
import os

app = Flask(__name__)

with open("./sysNameToNickname.json") as f:
    sysToNickname = json.load(f)

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
                systems[sysToNickname[player.get("system")]] += 1


            return jsonify({"playercount": systems, "timestamp": r.json().get("timestamp")})
    
    return getPlayerlist()