from . import db
from api import login
from flask_login import UserMixin, LoginManager
from werkzeug.security import generate_password_hash, check_password_hash    

class User(UserMixin, db.Model):
    """Data model for administradores"""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password) 

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Please use a different username.')
    
login = LoginManager()
@login.user_loader
def load_user(id):
    return User.query.get(int(id))
    
class Empresa(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(64))
    telefone = db.Column(db.String(64))
    morada = db.Column(db.String(64))
    codigopostal = db.Column(db.String(64))
    freguesia = db.Column(db.String(64))
    count = db.Column(db.Integer, nullable=False)



