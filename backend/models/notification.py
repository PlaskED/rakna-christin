from backend.dbapp import db as db
import time

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    checked = db.Column(db.Boolean, nullable=False)
    name = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(64), nullable=False)
    comment = db.Column(db.String(2048), nullable=False)
    created = db.Column(db.DateTime(), nullable=False)
    telephone = db.Column(db.String(20), nullable=False)
    when = db.Column(db.String(32), nullable=False)

    address = db.relationship("Address", uselist=False, 
                    back_populates="notification", lazy='joined')
    
    def get_address(self):
        return self.address.to_json()

    def __repr__(self):
        return '<Notification %r>' % self.id

    def to_json(self):
        address = self.get_address()
        del address['id']
        return {'id':self.id, 'checked':self.checked, 
                'name':self.name, 'comment':self.comment,
                'email':self.email, 'telephone':self.telephone,
                'when':self.when, 'address':self.get_address(),
                'created':self.created.strftime('%Y-%m-%d %H:%M:%S')}
    
