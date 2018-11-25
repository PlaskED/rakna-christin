from backend import app, dbapi, helpers, security, jwt
from flask import render_template, request, abort
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
from flask_uploads import (patch_request_class, configure_uploads,
                           UploadSet, IMAGES, UploadNotAllowed)
from flask_cors import CORS, cross_origin
#CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": ["http://www.raknamedchristin.se", "https://www.raknamedchristin.se"]}})
patch_request_class(app, app.config['MAX_CONTENT_LENGTH']) 
photos = UploadSet(app.config['IMAGES_DEST'], IMAGES)
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

@app.route('/api/login', methods=['POST'])
def login():
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
        'accessToken': access_token,
        'refreshToken': refresh_token,
    }
    
    return helpers.handleResponse(res, 200)

@app.route('/api/token/refresh', methods=['POST'])
@jwt_refresh_token_required
def refreshAccessToken():
    username = get_jwt_identity()
    res = {}
    res['data'] = { 'accessToken': create_access_token(identity=username) }
    return helpers.handleResponse(res, 200)

@app.route('/api/user/get', methods=['GET'])
@jwt_required
def getUser():
    res = {}
    res['data'] = dbapi.getUserByName(get_jwt_identity()).to_json()
    return helpers.handleResponse(res)

@app.route('/api/logout/access', methods=['GET'])
@jwt_required
def logoutAccess():
    jti = get_raw_jwt()['jti']
    res = {}
    res['data'] = dbapi.blacklistToken(jti)
    return helpers.handleResponse(res)

@app.route('/api/logout/refresh', methods=['GET'])
@jwt_refresh_token_required
def logoutRefresh():
    jti = get_raw_jwt()['jti']
    res = {}
    res['data'] = dbapi.blacklistToken(jti)
    return helpers.handleResponse(res)

@app.route('/api/notifications/unread/change', methods=['GET','POST'])
@jwt_required
def changeUnread():
    obj = request.get_json(silent=True)
    res = dbapi.changeUnread(obj['nid'], obj['checked'])
    return helpers.handleResponse(res)

@app.route('/api/notifications/unread', methods=['GET'])
@jwt_required
def getUnread():
    res = {}
    res['data'] = dbapi.getUnread()
    return helpers.handleResponse(res)
        
@app.route('/api/notifications/<int:index>', methods=['GET'])
@jwt_required
def getNotifications(index):
    res = {}
    res['data'] = dbapi.getNotifications(index)
    return helpers.handleResponse(res)

@app.route('/api/notification/create', methods=['POST'])
def createNotification():
    obj = request.get_json(silent=True)
    if not helpers.verify_recaptcha(obj['recaptcha']):
        err = helpers.generateError('Incorrect recaptcha', 400)
        return helpers.handleResponse(err)
    res = dbapi.createNotification(obj)
    if 'data' in res:
        #to = app.config['MAIL_NOTIFY_GROUP']
        to = dbapi.getAdminMailList()
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

@app.route('/api/image/upload', methods=['POST'])
@jwt_required
def uploadImages():
    if request.method == 'POST':
        res = {'data':{'uploaded':[], 'failed':[]}}
        for filename in request.files:
            try:
                new_file = request.files[filename]
                upload = photos.save(new_file)
            except UploadNotAllowed:
                res['data']['failed'].append(filename)
            else:
                path = "{}{}/{}".format(
                    app.config['UPLOADS_DEFAULT_DEST'], app.config['IMAGES_DEST'], upload)
                dbentry = dbapi.createImage(upload, path)
                if 'data' in dbentry:
                    res['data']['uploaded'].append(dbentry)
        return helpers.handleResponse(res)
    err = helpers.generateError('Bad request', 400)
    return helpers.handleResponse(err)

@app.route('/api/image/delete', methods=['POST'])
@jwt_required
def deleteImages():
    obj = request.get_json(silent=True)
    images_idx = obj['delete_images']
    res = dbapi.deleteImages(images_idx)
    return helpers.handleResponse(res, 204)

@app.route('/api/user/email/change', methods=['POST'])
@jwt_required
def changeEmail():
    obj = request.get_json(silent=True)
    user = dbapi.getUserByName(get_jwt_identity()).to_json()
    obj['uid'] = user['id']
    res = dbapi.changeEmail(obj)
    
    if 'data' in res:
        to = dbapi.getAdminMailList()
        subject = "Prenumeration på räknamedchristin"
        html = render_template('subscription.html')
        helpers.send_email(to, subject, html)
    return helpers.handleResponse(res, 200)

#def check_request(request):
#    if request.remote_addr != '127.0.0.1:3001':
#        return abort(403)

@app.after_request
def after_request(response):
    #response.headers.add('Access-Control-Allow-Origin', 'https://www.raknamedchristin.se')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

