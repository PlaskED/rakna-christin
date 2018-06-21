from backend.dbapp import db as db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), unique=True, nullable=False)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    admin = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
         return '<User %r>' % self.id

    def to_json(self):
        return {
            'id':self.id, 'email':self.email, 
            'admin':self.admin, 'username':self.username,
        }
