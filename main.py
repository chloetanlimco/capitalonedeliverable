# import sys
# sys.path.insert(0, 'lib')

# import urllib
# # urllib.urlopen(url)

# import json
from flask import Flask, render_template, request

# Configure API request
endpoint = "https://developer.nps.gov/api/v1/parks?stateCode=me"
HEADERS = {"Authorization":"9vkQK0bSPBKpWJs57opGQYCMaINTJmHqe1vmCAdy"}
# req = request.headers[HEADERS]
# ; flask.Request(environ, populate_request=True, shallow=False)
# req = request.Request(endpoint,headers=HEADERS)

# Initialize Application
app = Flask(__name__)
@app.route("/")
def home():
    return render_template("home.html")
@app.route("/about")
def about():
    return render_template("about.html")
if __name__ == "__main__":
    app.run(debug=True)

