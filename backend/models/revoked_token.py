from backend.dbapp import db as db

class RevokedToken(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(120))

    def to_json():
        return {'msg': 'token revoked'}
