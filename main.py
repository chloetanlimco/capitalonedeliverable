# import sys
# sys.path.insert(0, 'lib')

# import urllib
# # urllib.urlopen(url)


from flask import Flask, render_template, request, json, jsonify
import requests
# import urllib.request, json
# Configure API request


# Configure API request
# endpoint = "https://developer.nps.gov/api/v1/parks?stateCode=me"
# HEADERS = {"Authorization":"9vkQK0bSPBKpWJs57opGQYCMaINTJmHqe1vmCAdy"}
# , "Content-Type": "application/json", "q":"yellowstone"
# req = request.headers[HEADERS]
# ; flask.Request(environ, populate_request=True, shallow=False)
# req = request.Request(endpoint,headers=HEADERS)


# # Initialize Application
app = Flask(__name__)
@app.route("/")
def home():
    return render_template("home.html")
@app.route("/about")
def about():
    return render_template("about.html")
@app.route('/postjson', methods = ['GET', 'POST'])
def postJsonHandler():
    endpoint = "https://developer.nps.gov/api/v1/parks?stateCode=me"
    header_ = {"Authorization":"8ksWBtI7Yg9e8aVFU68JY5bN5o7bmcbwCJhdzI3i", "content-type":"application/json", "stateCode":"CA, AZ"}
    params = {"api_key": "8ksWBtI7Yg9e8aVFU68JY5bN5o7bmcbwCJhdzI3i"}
    # req = urllib.request.Request(endpoint,headers=HEADERS)
    # resp = json.load(req)
    # Additional code would follow
    # print (resp)



    # Initialize search set - ids of parks
    searchset = set()
    try:
        # add to set based on search terms entered


        empDict = requests.get(endpoint,params=params,headers=header_)
            # url = endpoint, params = HEADERS)
        # print(empDict)
        # print(empDict.text)
        # print ("statuscode: " + str(empDict.status_code))

        # for i in empDict:
        #     print (i)
        #     print ("----------------------------------------------")
        #     searchset.add(i)
        # convert to json data

    except Exception as e:
        print (e)

    data = empDict.json()
    return jsonify(data)
    # # create array to allow JSON serialization
    # retval = []
    # for each in searchset:
    #     print (each)
    #     retval.append(each)

    # jsonStr = json.dumps(retval)
    # return render_template("about.html")
#     # jsonStr = json.dumps(employeeList)
#     # print (request.is_json)
#     # content = request.get_json()
#     # print (content)
#     # return 'JSON posted'



if __name__ == "__main__":
    app.run(debug=True)