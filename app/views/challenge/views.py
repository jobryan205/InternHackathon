from flask import Blueprint, render_template
from app import app

challenge = Blueprint('challenge', __name__)

@app.route('/challenge/<id>', methods=['GET','POST'])
def do_challenge(id):

    if request.method == 'GET':
        challenge = app.mongo.db.challenge.find_one({'challengeId': id})
        print challenge
        return render_template('index.html')

    if request.method == 'POST':
        # TODO: more error handling?
        name = request.form['name']
        caption = request.form['caption']
        try:
            image = request.files['image']
        except RequestEntityTooLarge:
            print "image too large"
        #TODO: add photo to app build
