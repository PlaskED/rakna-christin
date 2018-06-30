from passlib.apps import custom_app_context as pwd_context
from backend.models import RevokedToken

def hashPassword(user, password):
    user.password_hash = pwd_context.hash(password)
    
def verifyPassword(user, password):
    return pwd_context.verify(password, user.password_hash)

def isTokenBlacklisted(_jti):
    t = RevokedToken.query.filter_by(jti=_jti).first()
    if t is None:
        return False
    return True
