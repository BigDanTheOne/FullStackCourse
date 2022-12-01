from flask import Flask, json, render_template
from db import getEventsByFilters, getEventById, Event, getUsersByIds
from flask_cors import CORS, cross_origin
import redis
import os
from flask import request
import logging

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
# CORS(app, support_credentials=True)
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
# @cross_origin(supports_credentials=True)
def eventFilter():
    filters = request.args.get('filters')
    user_id = request.args.get('user_id')
    filters = json.loads(filters)
    events = getEventsByFilters(filters)
    for i in range(len(events)):
        events[i].joined = (user_id in json.loads(r.get(events[i].id).decode('utf-8')))
    print(json.dumps([event.__dict__ for event in events]))
    response = json.jsonify([event.__dict__ for event in events])
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Headers", '*')
    return response

@app.route("/api/events/getUsers/", methods=['GET', 'POST', 'OPTIONS'])
# @cross_origin(supports_credentials=True)
def getUsers():
    IDs = request.args.get('UserIds')
    IDs = json.loads(IDs)
    users = getUsersByIds(IDs)
    response = json.jsonify([user.__dict__ for user in users])
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Headers", '*')
    return response

@app.route("/api/events/getEventsMembers/", methods=['GET', 'POST', 'OPTIONS'])
def getEventsMembers():
    IDs = request.args.get('EventIds')
    IDs = json.loads(IDs)
    for eventId in IDs:
        r.set(eventId, json.dumps([1]))
    members = [json.loads(r.get(eventId).decode("utf-8")) for eventId in IDs]
    response = json.jsonify([member if member else [] for member in members])
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Headers", '*')
    return response

if __name__ == '__main__':
    app.run(
        debug=True
    )