import requests
import json
import os 

from dotenv import load_dotenv
load_dotenv()

payload = {"token": os.getenv("CRONJOB_TOKEN")}
r = requests.post(os.getenv("ADDRESS_BASE") + "/api/cronjob", data=json.dumps(payload))
