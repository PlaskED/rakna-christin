#!/usr/bin/python3
from backend import models, dbapi
import sys

def generate_n_users(n):
    """Generates n test users"""
    for x in range(1, n+1):
        dbapi.createUser({
            'email':'test{}@test'.format(x),
            'username':'test{}'.format(x),
            'password':'test{}'.format(x),
            'admin':True,
            'address': {
                'city':'Linköping',
                'road':'Kungsgatan',
                'number':n
            }
        })

def init_db(n=0):
    with models.app.app_context():
        models.db.drop_all()
        models.db.create_all()
        if n != 0:
            generate_n_users(n)

if __name__ == "__main__":
    n = 0
    if len(sys.argv) == 2:
        n = int(sys.argv[1])
    init_db(n)
