import urllib.request, json
from flask import Flask, render_template

# Configure API request
endpoint = "https://developer.nps.gov/api/v1/parks?stateCode=me"
HEADERS = {"Authorization":"9vkQK0bSPBKpWJs57opGQYCMaINTJmHqe1vmCAdy"}
req = urllib.request.Request(endpoint,headers=HEADERS)


app = Flask(__name__)
@app.route("/")
def home():
    return render_template("home.html")
@app.route("/about")
def about():
    return render_template("about.html")
if __name__ == "__main__":
    app.run(debug=True)

