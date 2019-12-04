from flask import Flask, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS, cross_origin


db = SQLAlchemy()

def create_app():
    
    app = Flask(__name__)
    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['WHOOSH_BASE'] = 'api/indexes'
    app.config['SECRET_KEY'] = 'thisisasecret'

    #Estabelece a ligação com a db
    db.init_app(app)
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'login'

    from .views import main
    app.register_blueprint(main)

    def _build_cors_prelight_response():
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response

    def _corsify_actual_response(response):
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    return app