from flask import Flask
from flask_jwt_extended import JWTManager
from flask_mail import Mail

app = Flask(__name__)

app.config.from_object('config')
app.config.from_pyfile('../instance/config.py', silent=True)

jwt = JWTManager(app)
mail = Mail(app)

import backend.views
