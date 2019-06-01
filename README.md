# National Park Service Information Kiosk
*Capital One Deliverable: MindSumo Challenge* - Chloe Tanlimco

challenge link: https://www.mindsumo.com/contests/national-park-api

project link: https://npk-ct.appspot.com/

## Frameworks Used
- Flask
- Bootstrap

## Features
- Advanced Search allows for name and filtering based on states and designations
- Individual Park page styled similar to National Park pamphlets
- Park pages includes overview, visitor centers, campgrounds, articles, events, news releases, alerts, operating hours, and further readings (educational resources, including lesson plans, people, and places)
- Maps with visitor center and campground icons, if such things and their coordinates are available
- Campgrounds with icons based on amenities and accessibilities
- Option to show all search results (will take a considerably lengthier time to load)
- Entering a state name into the initial search will select that filter for you

## Challenges
- Learning how to handle and work with Flask
- Deploying the application to Google Cloud SDK
- Dynamically creating new pages and relying on frameworks
- Working with the National Parks Service API
- Passing an array from JS to Python and timing the page reload (this mechanism is still iffy - please be patient as it loads)
- Order of calling, updating when data comes in

## Future Steps
- Uncheck/check all boxes in menus
- Change url based on search terms
- ML algorithm to correctly orient the images returned from the get request on the advanced search page, find the best part of the image to show in individual park entries
- Add favicon
- Only display relevant tabs on park page (e.g. if there aren't any campgrounds, don't include campground tab)
- Location services - user-based output
- Photo slides for articles and campgrounds
- Creating Google Calendar for Events
- Buttons to organize events based on type
- Deal with more than the limit of 50 returns (from get request)
- Efficiency of get requests - instead of performing a request for every image, just deal with an internal database, and perform a get request every 24 or 48 hours to check for updates to file

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

https://ihatetomatoes.net/create-css3-spinning-preloader/