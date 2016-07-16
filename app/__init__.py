from flask import *
# from flask.ext.pymongo import PyMongo

# initialize application object
app = Flask(__name__, template_folder='templates')

# setup index blueprint
from app.templates.index.views import index
app.register_blueprint(index, url_prefix='/')