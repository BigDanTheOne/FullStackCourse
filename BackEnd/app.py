from flask import Flask, json, render_template
from db import getEventsByFilters, getEventById, Event, getUsersByIds
from flask_cors import CORS, cross_origin
import redis
import os
from flask import request
import logging

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app, support_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
logging.getLogger('flask_cors').level = logging.DEBUG


REDIS_URL = os.environ.get("REDIS_URL", None)
if REDIS_URL:
    redis_host, redis_port = REDIS_URL.split('@')[1].split(':')
    redis_password = REDIS_URL.split('@')[0].split(':')[-1]
    r = redis.Redis(host=redis_host, port=redis_port, password=redis_password)
else:
    r = redis.Redis(host='localhost', port=6379, db=0)

@app.route("/api/events/eventFilter/", methods=['GET', 'POST', 'OPTIONS'])
def eventFilter():
    filters = request.args.get('filters')
    filters = json.loads(filters)
    events = getEventsByFilters(filters)
    for i in range(len(events)):
        print(events)
        if r.get(events[i].id):
            members = json.loads(r.get(events[i].id).decode('utf-8'))
        else:
            members = {}
        events[i].members = members
    print(json.dumps([event.__dict__ for event in events]))
    response = json.jsonify([event.__dict__ for event in events])
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Headers", '*')
    return response

@app.route("/api/events/getUsers/", methods=['GET', 'POST', 'OPTIONS'])
def getUsers():
    IDs = request.args.get('UserIds')
    IDs = json.loads(IDs)
    users = getUsersByIds(IDs)
    response = json.jsonify([user.__dict__ for user in users])
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Headers", '*')
    return response


@app.route("/api/events/joinUser/", methods=['GET', 'POST'])
def joinUser():
    try:
        event_id = request.args.get('event_id')
        user_id = request.args.get('user_id')
        join = bool(request.args.get('join') == 'true')
        if r.get(event_id):
            members = json.loads(r.get(event_id).decode('utf-8'))
            if join:
                members = set(members)
                members.add(user_id)
                members = list(members)
            else:
                members = set(members)
                members.discard(user_id)
                members = list(members)
        else:
            if join:
                members = [user_id]
            else:
                members = []
        r.set(event_id, json.dumps(members))
        print(True)
        response = json.jsonify(True)
    except Exception as e:
        print(e)
        print(False)
        response = json.jsonify(False)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Headers", '*')
    return response

@app.route("/api/events/getEventsMembers/", methods=['GET', 'POST', 'OPTIONS'])
def getEventsMembers():
    IDs = request.args.get('EventIds')
    IDs = json.loads(IDs)
    for eventId in IDs:
        r.set(eventId, json.dumps([1]))
    members = set(json.loads(r.get(eventId).decode("utf-8")) for eventId in IDs)
    response = json.jsonify({member if member else []  for member in members})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Headers", '*')
    return response

if __name__ == '__main__':
    app.run(
        debug=True
    )