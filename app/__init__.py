from flask import *
from flask_pymongo import PyMongo
from flask_socketio import *

# initialize application object
app = Flask(__name__, template_folder='templates')

app.config['SECRET_KEY'] = '&\x98\x0f\x0f\x05\x1a\xd2\xbc\xef\xe2\\\x0b\xdcp\x98]\xd8\xdf\x8a|q\xd2(\x88'
app.config['MONGO_DBNAME'] = 'faceoff'
app.mongo = PyMongo(app)

prefix = '/'

# setup index blueprint
from app.views.index.views import index
app.register_blueprint(index, url_prefix=prefix)

# setup challenge blueprint
from app.views.challenge.views import challenge
app.register_blueprint(challenge, url_prefix=prefix)

#setup socketio
app.socketio = SocketIO(app)
if __name__ == '__main__':
    app.socketio.run(app)

@app.socketio.on('likeToggle')
def handle_like(likeToggleRequest):
    challenge = app.mongo.db.find_one({'challengeId': likeToggleRequest.challengeId})
    if challenge and challenge['submissions'] and challenge['submissions'][likeToggleRequest.submissionKey]:
        newSubmissions = challenge['submissions']
        if likeToggleRequest.toLike:
            newSubmissions[likeToggleRequest.submissionKey]['likes']['likeCount'] += 1
            newSubmissions[likeToggleRequest.submissionKey]['likes'][likeToggleRequest.requesterId] = True
        else:
            newSubmissions[likeToggleRequest.submissionKey]['likes']['likeCount'] -= 1;
            newSubmissions[likeToggleRequest.submissionKey]['likes'][likeToggleRequest.requesterId] = False
        app.mongo.db.challenge.update_one({'challengeId': likeToggleRequest.challengeId}, {'$set': {'submissions': newSubmissions}})
        emit('updateLikes', newSubmissions, room=likeToggleRequest.challengeId)

    else:
        print("Error liking: " + str(likeToggleRequest))

@app.socketio.on('sendInitialChallengeData')
def handle_initial_data(data):
    challenge = app.mongo.db.find_one({'challengeId': data['challengeId']})
    emit('sendInitialChallengeData', challenge, room=challengeId)

@app.socketio.on('join')
def on_join(data):
    print "USER JOINED!!!!!"
    print data
    join_room(data['connectionId'])
    send('')

@app.socketio.on('leave')
def on_leave(data):
    print "USER LEFT!!!!!"
    leave_room(data['connectionId'])
    send('')
    