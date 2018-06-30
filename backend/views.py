from backend import app, dbapi, helpers, security, jwt
from flask import render_template, request
from flask_jwt_extended import (create_access_token, create_refresh_token,
                        jwt_required, jwt_refresh_token_required,
                        get_jwt_identity, get_raw_jwt)
from flask_uploads import (patch_request_class, configure_uploads,
                           UploadSet, IMAGES, UploadNotAllowed)
from flask_cors import CORS, cross_origin
CORS(app)
patch_request_class(app) 
photos = UploadSet('photos', IMAGES)
configure_uploads(app, (photos))

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return security.isTokenBlacklisted(jti)

def invalidUser(user, password):
    if user is None:
        return True
    if security.verifyPassword(user, password) is False:
        return True

def verifyLogin(username, password):
    user = dbapi.getUserByName(username)
    if user is None:
        return False
    if invalidUser(user, password):
        return False
    return True

@app.route('/api/token/get', methods=['POST'])
def getAccessToken():
    obj = request.get_json(silent=True)

    if 'username' not in obj:
        err = helpers.generateError('username missing', 400)
        return helpers.handleResponse(err)
    if 'password' not in obj:
        err = helpers.generateError('password missing', 400)
        return helpers.handleResponse(err)
    if not verifyLogin(obj['username'], obj['password']):
        err = helpers.generateError('incorrect username or password', 400)
        return helpers.handleResponse(err)

    access_token = create_access_token(identity=obj['username'])
    refresh_token = create_refresh_token(identity=obj['username'])
    res = {}
    res['data'] = {
        'access_token': access_token,
        'refresh_token': refresh_token,
    }
    
    return helpers.handleResponse(res, 200)

@app.route('/api/token/refresh', methods=['POST'])
@jwt_refresh_token_required
@cross_origin(headers=['Content-Type'])
def refreshAccessToken():
    username = get_jwt_identity()
    res = {
        'data': {
            'access_token': create_access_token(identity=username)
        }
    }
    return helpers.handleResponse(res, 200)

@app.route('/api/user', methods=['GET'])
@jwt_required
@cross_origin(headers=['Content-Type'])
def user():
    res = {}
    res['data'] = dbapi.getUserByName(get_jwt_identity()).to_json()
    return helpers.handleResponse(res)

@app.route('/api/logout', methods=['GET'])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    res = {}
    res['data'] = dbapi.blacklistToken(jti)
    return helpers.handleResponse(res)
        
@app.route('/api/notifications/<int:index>', methods=['GET'])
@jwt_required
@cross_origin(headers=['Content-Type'])
def getNotifications(index):
    res = {}
    res['data'] = dbapi.getNotifications(index)
    return helpers.handleResponse(res)

@app.route('/api/notification/create', methods=['POST'])
def createNotification():
    obj = request.get_json(silent=True)
    res = dbapi.createNotification(obj)
    if 'data' in res:
        to = app.config['MAIL_NOTIFY_GROUP']
        subject = "Ny intresseanmälan"
        html = render_template('notify.html')
        helpers.send_email(to, subject, html)
    return helpers.handleResponse(res, 200)

@app.route('/api/notification/delete/<int:nid>', methods=['DELETE'])
@jwt_required
def deleteNotification(nid):
    res = dbapi.deleteNotification(nid)
    return helpers.handleResponse(res, 204)

@app.route('/api/images/<int:index>', methods=['GET'])
def getImages(index):
    res = {}
    res['data'] = dbapi.getImages(index)
    return helpers.handleResponse(res)

@app.route('/api/image/upload', methods=['GET', 'POST'])
@jwt_required
@cross_origin(headers=['Content-Type'])
def uploadImage():
    if request.method == 'POST' and 'photo' in request.files:
        try:
            _filename = photos.save(request.files['photo'])
        except UploadNotAllowed:
            err = helpers.generateError('Upload not allowed', 400)
            return helpers.handleResponse(err)
        else:
            path = photos.path(_filename)
            print("Filename: {}, Path: {}".format( _filename, path))
            res = dbapi.createImage(_filename, path)
            return helpers.handleResponse(res)
    err = helpers.generateError('Bad request', 400)
    return helpers.handleResponse(err)

@app.route('/api/image/delete/<int:iid>', methods=['DELETE'])
@jwt_required
def deleteImage(iid):
    res = dbapi.deleteImage(iid)
    return helpers.handleResponse(res, 204)

@app.route('/api/user/email/change', methods=['POST'])
@jwt_required
@cross_origin(headers=['Content-Type'])
def changeEmail():
    obj = request.get_json(silent=True)
    user = dbapi.getUserByName(get_jwt_identity()).to_json()
    obj['uid'] =  user['id']
    res = dbapi.changeEmail(obj)
    return helpers.handleResponse(res)
