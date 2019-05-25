from flask import Flask, render_template, request, json, jsonify
import requests
import config

#helper functions
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
        for i in range (1, 10):
            try:
                empDict = requests.get(endpoint,params=params,headers=header_)
            except Exception as e:
                print (e)
            if (empDict.json()):
                break

        data = empDict.json()

        # get image array
        imgArray = []
        for each in data["data"]:
            park = each["parkCode"]
            imgurlendpoint = "https://developer.nps.gov/api/v1/parks?parkCode=" + park + "&fields=images"
            imgreq = requests.get(imgurlendpoint, params=params, headers=header_)
            imagesobject = imgreq.json()
            imgArray.append(str(imagesobject["data"][0]["images"][0]["url"]))

        return render_template("filter.html", numentries=data["total"], value=data["data"], imgArray=json.dumps(imgArray), all_states=json.dumps(all_states), curr_states=json.dumps(curr_states))

    else:
        params = {"api_key": config.api_key}
        for i in range (1, 10):
            try:
                empDict = requests.get(endpoint,params=params,headers=header_)
            except Exception as e:
                print (e)
            if (empDict.json()):
                break
        
        data = empDict.json()

        imgArray = []
        for each in data["data"]:
            park = each["parkCode"]
            imgurlendpoint = "https://developer.nps.gov/api/v1/parks?parkCode=" + park + "&fields=images"
            for i in range (1, 10):
                try:
                    imgreq = requests.get(imgurlendpoint, params=params, headers=header_)
                except Exception as e:
                    print (e)
                if (imgreq.json()):
                    break

            imagesobject = imgreq.json()
            imgArray.append(str(imagesobject["data"][0]["images"][0]["url"]))

        return render_template("filter.html", numentries=data["total"], value=data["data"], imgArray=json.dumps(imgArray), all_states=json.dumps(all_states), curr_states=json.dumps(curr_states))

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/park/<string:park_code>")
def park(park_code):

    # OVERALL PARK REQUEST
    params = {"api_key": config.api_key, "parkCode":park_code}

    for i in range (1, 10):
        try:
            empDict = requests.get(endpoint,params=params,headers=header_)
        except Exception as e:
            print (e)
        if (empDict.json()):
            break
    data = empDict.json()

    # GET HEADER IMAGE
    imgurlendpoint = "https://developer.nps.gov/api/v1/parks?parkCode=" + park_code + "&fields=images"
    imgparams = {"api_key": config.api_key}
    imgreq = requests.get(imgurlendpoint, params=imgparams, headers=header_)
    imagesobject = imgreq.json()
    try:
        imglink = str(imagesobject["data"][0]["images"][1]["url"])
    except Exception as e:
        print (e)
        imglink = str(imagesobject["data"][0]["images"][0]["url"])

    # OPERATING HOURS
    ohendpoint = "https://developer.nps.gov/api/v1/parks?parkCode=" + park_code + "&fields=operatingHours"
    ohparams = {"api_key": config.api_key}
    for i in range (1, 10):
        try:
            ohreq = requests.get(ohendpoint, params=ohparams, headers=header_)
        except Exception as e:
            print (e)
        if (ohreq.json()):
            break
    ohobject = ohreq.json()["data"][0]["operatingHours"][0]["standardHours"]
    oharray = [ohobject["sunday"], ohobject["monday"], ohobject["tuesday"], ohobject["wednesday"], ohobject["thursday"], ohobject["friday"], ohobject["saturday"]]

    # VISITOR CENTERS
    vc_url = "https://developer.nps.gov/api/v1/visitorcenters?"
    for i in range (1, 10):
        try:
            vcreq = requests.get(vc_url, params=params, headers=header_)
        except Exception as e:
            print (e)
        if (vcreq.json()):
            break
    vc_data = vcreq.json()

    # CAMPGROUNDS
    camp_url = "https://developer.nps.gov/api/v1/campgrounds?"
    for i in range (1, 10):
        try:
            campreq = requests.get(camp_url, params=params, headers=header_)
        except Exception as e:
            print (e)
        if (campreq.json()):
            break
    camp_data = campreq.json()
    print (camp_data)

    # ALERTS
    alert_url = "https://developer.nps.gov/api/v1/alerts?"
    for i in range (1, 10):
        try:
            alertreq = requests.get(alert_url, params=params, headers=header_)
        except Exception as e:
            print (e)
        if (alertreq.json()):
            break
    alert_data = alertreq.json()

    # ARTICLES

    # EVENTS

    # NEWS RELEASES


    return render_template("park.html", park_data = data["data"], image = imglink, alert_data = alert_data, oh_data = oharray, vc_data = vc_data, camp_data = camp_data, park_code=park_code)

if __name__ == "__main__":
    app.run(debug=True)


