from flask import Flask, render_template, request, json, jsonify, redirect, url_for, make_response
import requests
import config

# helper functions
# convert array to format for search terms
def stringify(states_array): 
    retval = ""
    for x in states_array:
        retval += x
        retval += ","
    retval = retval[:-1]
    return retval

# check if search term is a state - binary search
def searchforstate(array, left, right, term):
    # base case
    if right < left:
        return -1
    midpoint = int((left + right) / 2)
    if (array[midpoint] == term):
        return midpoint
    elif array[midpoint] > term:
        return searchforstate(array, left, midpoint-1, term)
    else:
        return searchforstate(array, midpoint+1, right, term)

# Initialize NPS API Request
endpoint = "https://developer.nps.gov/api/v1/parks?"
header_ = {"Authorization": config.api_key}

# Initialize Application
app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route("/")
def home():

    if request.method == 'POST':
        return advancedsearch()
    return render_template("home.html")

@app.route('/advancedsearch', methods = ['GET', 'POST'])
def advancedsearch():

    states_names = ["alabama","alaska","american samoa","arizona",'arkansas',"california","colorado","connecticut","district of columbia","delaware","federated states of micronesia","florida","georgia","guam","hawaii","idaho","illinois","indiana","iowa","kansas","kentucky","louisiana","maine",
        "maryland","marshall islands","massachusetts","michigan","minnesota","mississippi","missouri","montana","nebraska","nevada","new hampshire","new jersey","new mexico","new york","north carolina","north dakota","northern mariana islands","ohio","oklahoma","oregon","palau","pennsylvania","puerto rico","rhode island","south carolina","south dakota",
        "tennessee","texas","utah","vermont","virginia","virgin islands","washington","west virginia","wisconsin","wyoming"]

    all_states = ["AL","AK","AS","AZ",'AR',"CA","CO","CT","DC","DE","FM","FL","GA","GU","HI","ID","IL","IN","IA","KS","KY","LA","ME",
    "MD","MH","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","MP","OH","OK","OR","PW","PA","PR","RI","SC","SD",
    "TN","TX","UT","VT","VA","VI","WA","WV","WI","WY"]

    all_designations = ["National Park","National Monument","National Preserve","National Lakeshore","National Seashore",
        "National River", "Wild and Scenic Riverways", "National Scenic Trails", "National Historic Trails", "National Historic Site",
        "National Military Park", "National Battlefield Park", "National Battlefield Site", "National Battlefield", 
        "National Historical Park", "National Historic Sites", "International Historic Site", "National Memorial", "National Recreation Areas", 
        "National Parkways", "Performing Arts"]


    if (request.form.getlist('states[]')):
        curr_states = request.form.getlist('states[]')
    else:
        curr_states = []

    if (request.form.getlist('designations[]')):
        curr_designations = request.form.getlist('designations[]')
    else:
        curr_designations = []

    if (request.form.getlist('limit')):
        limit = request.form.getlist('limit')
    else:
        limit = 50


    # Executing and search (not or); not necessary to parse string
    if (request.form.get("searchterms")):
        search = request.form.get("searchterms")
        index = searchforstate(states_names, 0, int(len(states_names)-1), search.lower())
        if (index != -1):
            # add it to curr_states in its correct position
            i = 0
            if (len(curr_states)):
                while (curr_states[i] < search):
                    i += 1
            curr_states.insert(i, all_states[index])
            # Initialize page-specific params for request
            params = {"api_key": config.api_key, "stateCode":stringify(curr_states), "limit": limit}
        else:
            params = {"api_key": config.api_key, "q":str(search), "stateCode":stringify(curr_states), "limit": limit}
    else:
        params = {"api_key": config.api_key, "stateCode":stringify(curr_states), "limit": limit}

    for i in range (1, 10):
        try:
            empDict = requests.get(endpoint,params=params,headers=header_)
        except Exception as e:
            print (e)
        if (empDict.json()):
            break

    data = empDict.json()

    # filter out those not of appropriate designation
    if (len(curr_designations)):
        output_dict = []
        for each in curr_designations:
            output_dict += [x for x in data["data"] if x['designation'] == each]
        newdata = output_dict
    else:
        newdata = data["data"]
    
    # get image array
    imgArray = []
    for each in newdata:
        park = each["parkCode"]
        imgurlendpoint = "https://developer.nps.gov/api/v1/parks?parkCode=" + park + "&fields=images"
        imgreq = requests.get(imgurlendpoint, params=params, headers=header_)
        imagesobject = imgreq.json()
        if (imagesobject and imagesobject["data"][0]["images"]):
            imgArray.append(str(imagesobject["data"][0]["images"][0]["url"]))

    return render_template("filter.html", numentries=len(newdata), value=newdata, imgArray=json.dumps(imgArray), all_states=json.dumps(all_states), curr_states=json.dumps(curr_states), all_designations=json.dumps(all_designations), curr_designations=json.dumps(curr_designations))

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
    articles_url = "https://developer.nps.gov/api/v1/articles?"
    for i in range (1, 10):
        try:
            articlesreq = requests.get(articles_url, params=params, headers=header_)
        except Exception as e:
            print (e)
        if (articlesreq.json()):
            break
    articles_data = articlesreq.json()

    # EVENTS
    events_url = "https://developer.nps.gov/api/v1/events?"
    for i in range (1, 10):
        try:
            eventsreq = requests.get(events_url, params=params, headers=header_)
        except Exception as e:
            print (e)
        if (eventsreq.json()):
            break
    events_data = eventsreq.json()

    # NEWS RELEASES
    news_url = "https://developer.nps.gov/api/v1/newsreleases?"
    for i in range (1, 10):
        try:
            newsreq = requests.get(news_url, params=params, headers=header_)
        except Exception as e:
            print (e)
        if (newsreq.json()):
            break
    news_data = newsreq.json()

    # EDUCATIONAL RESOURCES
    edu_url = "https://developer.nps.gov/api/v1/lessonplans?"
    for i in range (1, 10):
        try:
            edureq = requests.get(edu_url, params=params, headers=header_)
        except Exception as e:
            print (e)
        if (edureq.json()):
            break
    edu_data = edureq.json()
    
    # PEOPLE
    people_url = "https://developer.nps.gov/api/v1/people?"
    for i in range (1, 10):
        try:
            peoplereq = requests.get(people_url, params=params, headers=header_)
        except Exception as e:
            print (e)
        if (peoplereq.json()):
            break
    people_data = peoplereq.json()
    
    # PLACES
    places_url = "https://developer.nps.gov/api/v1/places?"
    for i in range (1, 10):
        try:
            placesreq = requests.get(places_url, params=params, headers=header_)
        except Exception as e:
            print (e)
        if (placesreq.json()):
            break
    places_data = placesreq.json()

    return render_template("park.html", park_data = data["data"], image = imglink, alert_data = alert_data, oh_data = oharray, vc_data = vc_data, camp_data = camp_data, article_data = articles_data, event_data = events_data, news_data = news_data, edu_data = edu_data, people_data = people_data, places_data = places_data, park_code=park_code)

if __name__ == "__main__":
    app.run(debug=True)