from flask import Flask, render_template, request, json, jsonify
import requests
import config

#helper function
def stringify(states_array):
    retval = ""
    for x in states_array:
        retval += x
        retval += ","
    retval = retval[:-1]
    return retval

# Initialize API Request
endpoint = "https://developer.nps.gov/api/v1/parks?"
header_ = {"Authorization": config.api_key}

# Initialize Application
app = Flask(__name__)
@app.route("/")
def home():

    if request.method == 'POST':
        return advancedsearch()

    return render_template("home.html")

@app.route('/advancedsearch', methods = ['GET', 'POST'])
def advancedsearch():

    all_states = ["AL","AK","AZ",'AR',"CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME",
    "MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD",
    "TN","TX","UT","VT","VA","WA","WV","WI","WY"]
    curr_states = []

    if request.method == 'POST':
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
        # print (type(empDict))
      
        # print (data["data"][0]["states"])
        # return jsonify(data)
        return render_template("filter.html", numentries=data["total"], value=data["data"])

    else:
        params = {"api_key": config.api_key}
        empDict = requests.get(endpoint,params=params,headers=header_)
        data = empDict.json()
        print (stringify(all_states))
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


