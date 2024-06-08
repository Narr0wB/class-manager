import requests
import json

payload = {"token": "eddugamingaudio"}

r = requests.post("http://localhost:3000/api/cronjob", data=json.dumps(payload))