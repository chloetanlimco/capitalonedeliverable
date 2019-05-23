from flask import Flask, render_template, request, json, jsonify
import requests
import config

# Initialize API Request
endpoint = "https://developer.nps.gov/api/v1/parks?"
header_ = {"Authorization": config.api_key, "content-type":"application/json"}

# Initialize Application
app = Flask(__name__)
@app.route("/")
def home():

    if request.method == 'POST':
        return allparks()

    return render_template("home.html")

@app.route('/allparks', methods = ['GET', 'POST'])
def allparks():
    # Executing and search (not or); not necessary to parse string
    search = request.form["searchterms"]

    # Initialize page-specific params for request
    params = {"api_key": config.api_key, "q":str(search)}
    try:
        empDict = requests.get(endpoint,params=params,headers=header_)
    except Exception as e:
        print (e)

    data = empDict.json()
    print (type(data["data"]))
    print (data["data"][0]["states"])
    # return jsonify(data)
    return render_template("filter.html", numentries=data["total"], value=data["data"])

@app.route("/about")
def about():
    return render_template("about.html")

@app.route('/postjson', methods = ['GET', 'POST'])
def postJsonHandler():

    # Executing and search (not or); not necessary to parse string
    search = request.form["searchterms"]

    # Initialize page-specific params for request
    params = {"api_key": config.api_key, "q":str(search)}
    try:
        empDict = requests.get(endpoint,params=params,headers=header_)
    except Exception as e:
        print (e)

    data = empDict.json()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)