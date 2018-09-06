from backend.dbapp import db as db

class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(64), nullable=False)
    road = db.Column(db.String(64))
    number = db.Column(db.String(10))
    notification_id = db.Column(db.Integer, db.ForeignKey('notification.id'))
    notification = db.relationship("Notification", back_populates="address")

    def __repr__(self):
        return '<Address %r>' % self.id

    def to_json(self):
        return {'id':self.id, 'city':self.city,
                'road':self.road, 'number':self.number}
