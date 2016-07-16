from flask import Blueprint, render_template, request
from werkzeug.utils import secure_filename
from flask_pymongo import PyMongo
from app import app
import os
#import PIL
#from PIL import Image

challenge = Blueprint('challenge', __name__)

@app.route('/challenge/<challengeId>', methods=['GET','POST'])
def do_challenge(challengeId):

    if request.method == 'GET':
        challenge = app.mongo.db.challenge.find_one({'challengeId': challengeId})
        return render_template('challenge/challenge.html', challenge=challenge)

    if request.method == 'POST':
        # TODO: more error handling?
        name = request.form['name']
        caption = request.form['caption']
        image = request.files['image']

        path = os.getcwd() + '/app/static/pictures/store/' + secure_filename(image.filename)
        image.save(path)

        challenge = app.mongo.db.challenge.find_one({'challengeId': challengeId})
        if challenge:
            useKey = challenge['submissions']['nextKey']
            challenge['submissions']['nextKey'] += 1
            challenge['submissions'][str(useKey)] = {
                'name': name,
                'url': path,
                'caption': caption,
                'likes': {
                    'likeCount': 0
                }
            }
            app.mongo.db.challenge.update_one({'challengeId': challengeId}, {'$set': {'submissions': challenge['submissions']}})
            app.socketio.emit('uploadPhoto', challenge['submissions'], room=challengeId)
            #Maybe return something else
            return ''

