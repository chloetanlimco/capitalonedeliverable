# National Park Service Information Kiosk
*Capital One Deliverable: MindSumo Challenge* - Chloe Tanlimco

project link: https://npk-ct.appspot.com/

## Frameworks Used
- Flask
- Bootstrap

## Features


## Challenges


## Features to be Added
1. Uncheck/check all boxes in menus
2. Change url based on search terms
3. ML algorithm to correctly orient the images returned from the get request on the advanced search page

## Running the Program Locally
Create a new file in the root directory called config.py.

Add: `api_key = "[Your API Key Here]"` to config.py with your own NPS api key obtained at https://www.nps.gov/subjects/developer/get-started.htm

Open folder in the command line, activate virtual environment (`$ source virtual/bin/activate`) and run: `python3 main.py` or `py main.py`

Go to <localhost:5000> on your choice of web browser

## Development Notes
For OSX and Linux: `$ source virtual/bin/activate`

Run `pip install -t lib -r requirements.txt` within virtual environment if requirements is updated

Run `dev_appserver.py app.yaml` on command line, check http://localhost:8080/form to ensure it's production-ready
(https://cloud.google.com/appengine/docs/standard/python/getting-started/python-standard-env)

To deploy changes to Google App Engine, `gcloud app deploy --project npk-ct` 

### Resources used: 
https://www.nps.gov/subjects/developer/api-documentation.htm#/alerts/getAlerts

https://github.com/nationalparkservice

https://medium.freecodecamp.org/how-to-build-a-web-application-using-flask-and-deploy-it-to-the-cloud-3551c985e492

https://mlsdev.com/blog/81-a-beginner-s-tutorial-for-understanding-restful-api

https://mdbootstrap.com/docs/jquery/forms/checkbox/

https://www.tutorialspoint.com/online_bootstrap_editor.php
