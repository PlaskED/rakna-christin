from backend import app, mail
from flask import jsonify
from flask_mail import Message

def handleResponse(res, success=200):
    response = jsonify(res)
    if 'data' in res:
        response.status_code = success
    elif 'error' in res:    
        response.status_code = res['error']['code']
    else:
        response = jsonify(errorhelper.generateError(500, 
                                'internal server error'))
        response.status_code = 500
    return response

def commitResponse(session, res, query_object=None):
    "Commits session and returns JSON response"""
    try:
        session.commit()
        if query_object is not None:
            res['data'] = query_object.to_json()
        else: #No query_object means deletion
            res['data'] = 'deletion ok'
    except:
        session.rollback()
    finally:
        return res

def currentTime():
    return time.strftime('%Y-%m-%d %H:%M:%S')

def generateError(msg, code):
    res = {}
    res['error'] = {
        "code": code,
        "message": msg
    }
    return res

def send_email(to, subject, template):
    msg = Message(
        subject,
        recipients=to,
        html=template,
        sender=app.config['MAIL_USERNAME']
    )
    mail.send(msg)
