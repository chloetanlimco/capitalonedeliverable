# National Park Service Information Kiosk
*Capital One Deliverable* - Chloe Tanlimco

project link: https://npk-ct.appspot.com/


## Running the Program Locally
Open folder in the command line and run: `python3 main.py` or `py main.py`

Go to <localhost:5000> on your choice of web browser

## Development Notes
For OSX and Linux: `$ source virtual/bin/activate`

Run `pip install -t lib -r requirements.txt` within virtual environment if requirements is updated

Run `dev_appserver.py app.yaml` on command line, check http://localhost:8080/form to ensure it's production-ready
(https://cloud.google.com/appengine/docs/standard/python/getting-started/python-standard-env)

To deploy changes to Google App Engine, `gcloud app deploy --project npk-ct` 

### Resources used: 
https://medium.freecodecamp.org/how-to-build-a-web-application-using-flask-and-deploy-it-to-the-cloud-3551c985e492

https://mlsdev.com/blog/81-a-beginner-s-tutorial-for-understanding-restful-api
