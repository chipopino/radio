# :8001/ returns {"name": str, "url": str}

import random
import requests
import re
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

def getStationsJson(searchTerm):
    responce = requests.get("http://de1.api.radio-browser.info/json/stations/bytag/" + searchTerm)
    stations = [{"defaultName": x['name'], "url": x['url']} for x in json.loads(responce.text)]
    return json.dumps(stations).encode('utf-8')

def getSkin(recursion = 0):

    with open('out.txt') as file:
        lines = file.readlines()
    
    max = len(lines) - 1

    rndSkin = lines[random.randint(0, max)].strip()

    url_base = "https://archive.org/download/"
    url_download_page = url_base + rndSkin + '/'
    url_download = ''

    response = requests.get(url_download_page)
    
    if response.status_code == 200 and recursion < 10:
        html_content = response.text
        match = re.search(r"href=\"(.*?wsz)\"", html_content)
        if(match):
            url_download = url_download_page + match.group(1)
            return json.dumps({"name": rndSkin, "url": url_download}).encode('utf-8')
        else:
            getSkin(recursion + 1)  
    else:
        getSkin(recursion + 1)



class SimpleHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/getStations":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(getStationsJson(data["searchTerm"]))
        else:
            self.send_response(404)

    def do_GET(self):
        if self.path == "/getSkin":
            data = getSkin()
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(data)
        else:
            self.send_response(404)
            
server_address = ('', 8001)
httpd = HTTPServer(server_address, SimpleHandler)
print("Starting server on port 8000...")
httpd.serve_forever()


# http://de1.api.radio-browser.info/{format}/stations/bytag/{searchterm}
# http://de1.api.radio-browser.info/{format}/stations/bycountry/{searchterm}
# http://de1.api.radio-browser.info/{format}/stations/byname/{searchterm}
