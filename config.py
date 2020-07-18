import os

basedir = os.path.abspath(os.path.dirname(__file__))

class config:    
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'this is a secret string' 
    SQLALCHEMY_TRACK_MODIFICATIONS = True  

     @staticmethod    
     def init_app(app):        
        pass

class DevelopmentConfig(config):    
    DEBUG = True    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \        
    'sqlite:///' + os.path.join(basedir, 'dev')

class TestingConfig(config):    
    TESTING = True    
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or \                              
    'sqlite:///' + os.path.join(basedir, 'test')

class ProductionConfig(config):    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \                              
    'sqlite:///' + os.path.join(basedir, 'data.sqlite')

config = {    
    'development': DevelopmentConfig,    
    'testing': TestingConfig,    
    'production': ProductionConfig,    
    'default': DevelopmentConfig
}
