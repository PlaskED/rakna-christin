from backend.dbapp import db as db

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), unique=True, nullable=False)
    path = db.Column(db.String(128), unique=True, nullable=False)

    def __repr__(self):
         return '<Image %r>' % self.id

    def to_json(self):
        return {'id':self.id, 'name':self.name,
                'path':self.path}
