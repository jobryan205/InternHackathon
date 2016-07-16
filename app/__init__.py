from flask import *
from flask_pymongo import PyMongo

# initialize application object
app = Flask(__name__, template_folder='templates')

app.config['MONGO_DBNAME'] = 'faceoff'
app.mongo = PyMongo(app)

prefix = '/'

# setup index blueprint
from app.views.index.views import index
app.register_blueprint(index, url_prefix=prefix)

# setup challenge blueprint
from app.views.challenge.views import challenge
app.register_blueprint(challenge, url_prefix=prefix)