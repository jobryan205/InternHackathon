from flask import *
from app import app
import random
import uuid

index = Blueprint('index', __name__)

def generateHex():
    letters = ("A","B","C","D","E","F","G","H")
    numbers = ("1","2","3","4","5","6", "7","8","9")

    string1 = ''
    for i in range(0,3):
        letter = random.choice(letters)
        num = random.choice(numbers)
        string2 = num.join(letter)
        string3 = letter.join(num)
        string1 = string1 + string2 + string3
    return string1

@app.route('/', methods=['GET', 'POST'])
def do_index():

    if request.method == 'GET':
        if request.cookies.get('userID'):
            return render_template('index/index.html')
        else:
            resp = make_response(render_template('index/index.html'))
            resp.set_cookie('userID', bytes(uuid.uuid4()))
            return resp

    if request.method == 'POST':
        hexId = generateHex()
        while app.mongo.db.challenge.find_one({'challengeId': hexId}):
            hexId = generateHex()

        challengeName = request.form['challengeName']
        #timer = request.form['timer']

        challenge = {
            'challengeId': hexId,
            'name': challengeName,
            #'timer': timer,
            #'endTime': dateTime.min,
            'submissions': {
                'nextKey': 0
            }
        }
        app.mongo.db.challenge.insert(challenge)
        return (url_for('do_challenge', challengeId=hexId))
