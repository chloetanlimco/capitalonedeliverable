from flask import Flask, render_template, request, json, jsonify
import requests

# Initialize API Request
endpoint = "https://developer.nps.gov/api/v1/parks?"
header_ = {"Authorization":"8ksWBtI7Yg9e8aVFU68JY5bN5o7bmcbwCJhdzI3i", "content-type":"application/json"}

# Initialize Application
app = Flask(__name__)
@app.route("/")
def home():

    if request.method == 'POST':
        return postjson()

    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route('/postjson', methods = ['GET', 'POST'])
def postJsonHandler():

    # Executing and search (not or); not necessary to parse string
    search = request.form["searchterms"]

    # Initialize page-specific params for request
    params = {"api_key": "8ksWBtI7Yg9e8aVFU68JY5bN5o7bmcbwCJhdzI3i", "q":str(search)}
    try:
        empDict = requests.get(endpoint,params=params,headers=header_)
    except Exception as e:
        print (e)

    data = empDict.json()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)