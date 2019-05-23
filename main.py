from flask import Flask, render_template, request, json, jsonify
import requests

# Initialize API Request
endpoint = "https://developer.nps.gov/api/v1/parks?stateCode=me"

# Initialize Application
app = Flask(__name__)
@app.route("/")
def home():
    # search = searchterms
    # if request.method == 'POST':
    #     return postjson(search)

    return render_template("home.html")
@app.route("/about")

def about():
    return render_template("about.html")
@app.route('/postjson', methods = ['GET', 'POST'])

def postJsonHandler():
    # Initialize page-specific header for request
    params = {"api_key": "8ksWBtI7Yg9e8aVFU68JY5bN5o7bmcbwCJhdzI3i", "stateCode":"AZ,CA"}
    header_ = {"Authorization":"8ksWBtI7Yg9e8aVFU68JY5bN5o7bmcbwCJhdzI3i", "content-type":"application/json"}

    try:
        empDict = requests.get(endpoint,params=params,headers=header_)
    except Exception as e:
        print (e)

    data = empDict.json()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)