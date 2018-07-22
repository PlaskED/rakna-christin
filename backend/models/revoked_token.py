from backend.dbapp import db as db

class RevokedToken(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(256), unique=True, nullable=False)

    def __repr__(self):
        return '<RevokenToken %r>' % self.id

    def to_json(self):
        return {'id':self.id, 'jti': self.jti}
