DEBUG = True #Set to False in release
ERROR_404_HELP = True #Set to False in release

#Token settings
SECRET_KEY = 'secret_key' #generate your own key
JWT_SECRET_KEY = 'jwt-secret-key' #generate your own key
JWT_BLACKLIST_ENABLED = True
JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']

#DB settings
DB_USER = 'root' #db user username
DB_PASSWORD = 'root' #db user password
DB = 'testdb' #db name

#Mail settings
MAIL_NOTIFY_GROUP = ['admin1@test', 'admin2@test'] #example
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 465
MAIL_USERNAME = 'yourId@gmail.com' #Change this to yours
MAIL_PASSWORD = '*****' #Change this to yours
MAIL_USE_TLS = False
MAIL_USE_SSL = True

#ORM settings
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{}:{}@localhost/{}'.format(DB_USER, DB_PASSWORD, DB) #Leave as is
SQLALCHEMY_TRACK_MODIFICATIONS = False #Leave as is
