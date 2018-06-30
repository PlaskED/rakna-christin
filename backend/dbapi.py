from backend import models, helpers, security
from sqlalchemy import desc

def blacklistToken(_jti):
    revoken_token = models.RevokedToken(jti=_jti)
    models.db.session.add(revoked_roken)
    return helpers.commitResponse(models.db.session, {}, revoked_token)

def getUser(uid):
    return models.User.query.get(uid)

def getUserByEmail(_email):
    return models.User.query.filter_by(email=_email).first()

def getUserByName(_username):
    return models.User.query.filter_by(username=_username).first()

def userExists(_username, _email):
    return getUserByName(_username) is not None \
        or getUserByEmail(_email) is not None

def createUser(obj):
    if userExists(obj['username'], obj['email']):
        return errorhelper.generateError('username or password already exist', 400)
    user_object = models.User(
        email=obj['email'],
        username=obj['username'],
        admin=obj['admin'],
    )
    security.hashPassword(user_object, obj['password'])
    models.db.session.add(user_object)
    return helpers.commitResponse(models.db.session, {}, user_object)
    
def changeEmail(obj):
    user_object = getUser(obj['uid'])
    user_object.email = obj['email']
    return helpers.commitResponse(models.db.session, {}, user_object)

def getNotifications(index):
    notifications = models.Notification.query\
                    .filter(models.Notification.id > index)\
                    .order_by(desc(models.Notification.id)).limit(5)
    return [n.to_json() for n in notifications]

def getNotification(nid):
    return models.Notification.query.get(nid)

def createNotification(obj):
    notification_object = models.Notification(
        checked=False,
        name=obj['name'],
        email=obj['email'],
        comment=obj['comment'],
        created=helpers.currentTime(),
        telephone=obj['telephone'],
        when=obj['when']
    )
    notification_object.address = models.Address(
        city=obj['address']['city'],
        road=obj['address']['road'],
        number=obj['address']['number']
    )
    models.db.session.add(notification_object)

    return helpers.commitResponse(models.db.session, {}, notification_object)

def deleteNotification(nid):
    notification_object = getNotification(nid)
    if notification_object is None:
        return errorhelper.generateError("Notification doesn't exist", 400)
    models.db.session.delete(notification_object)

    return helpers.commitResponse(models.db.session, {})

def getImages(index):
    images = models.Image.query\
                    .filter(models.Image.id > index)\
                    .order_by(desc(models.Image.id)).limit(10)
    return [i.to_json() for i in images]

def getImage(iid):
    return models.Image.query.get(iid)

def createImage(_name, _path):
    image_object = models.Image(name=_name, path=_path)
    models.db.session.add(image_object)
    return helpers.commitResponse(models.db.session, {}, image_object) 

def deleteImage(iid):
    image_object = getImage(iid)
    if image_object is None:
        return errorhelper.generateError("Image doesn't exist", 400)
    models.db.session.delete(image_object)

    return helpers.commitResponse(models.db.session, {})
