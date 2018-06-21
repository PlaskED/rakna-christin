from backend.dbapp import db as db

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(128), unique=True, nullable=False)

    def __repr__(self):
         return '<Image %r>' % self.id

    def to_json(self):
        return {'id':self.id, 'path':self.path}
