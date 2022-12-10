import json

from sqlalchemy import create_engine, MetaData, select, update, Table, insert, text, delete
from datetime import datetime, timedelta, timezone

import os
metadata_obj = MetaData()
DB_PATH = os.environ['DATABASE_URL'][:8] + 'ql' + os.environ['DATABASE_URL'][8:]
engine = create_engine(DB_PATH, pool_size=6, max_overflow=10)
engine.connect()
Users = Table("users", metadata_obj, autoload_with=engine)
Events = Table("event", metadata_obj, autoload_with=engine)

offset = timedelta(hours=3)
tz = timezone(offset, name='МСК')

class Event:
    def __init__(self, id, title, description, lat, long, time, category, image):
        self.id = id
        self.title = title
        self.description = description
        self.position = [lat, long]
        self.time = time
        if time:
            self.time = time.replace(tzinfo=tz)
        self.category = category
        self.image = image



class User:
    def __init__(self, user_id, nickname):
        self.user_id = user_id
        self.nickname = nickname

def getEventById(event_id):
    with engine.connect() as conn:
        stmt = select(Events).where(Events.c.event_id == event_id)
        res = conn.execute(stmt).all()
        if len(res):
            return Event(*res[0])
        else:
            'NO_EVENT'

def getEventsByFilters(filters):
    with engine.connect() as conn:
        stmt = select(Events).where(Events.c.category.in_(filters))
        res = conn.execute(stmt).all()
        if len(res):
            return [Event(*r) for r in res]
        else:
            return []

def getUsersByIds(IDs):
    with engine.connect() as conn:
        stmt = select(Users).where(Users.c.id.in_(IDs))
        res = conn.execute(stmt).all()
        if len(res):
            return [User(*r) for r in res]
        else:
            'NO_EVENT'