from backend import app as app
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)
