#!/usr/bin/python3
from backend import app 

if __name__ == '__main__':
    app.run(threaded=True, port = 5000)
