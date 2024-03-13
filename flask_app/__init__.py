from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

app = Flask(__name__)  
app.config['SECRET_KEY'] = '31b4eafb4db5a2253fb33bd1368c4d79'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sqlite.db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)

from .models import ProcessedFiles, User
from .forms import LoginForm, RegistrationForm
from flask_app import routes
#for custom jinja template tags
from .template_tags import datetimeformat

