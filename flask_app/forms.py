from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from .models import User

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=2, max=20)], 
                           render_kw={"placeholder": "Enter your username"})
    
    email = StringField('Email', validators=[DataRequired(), Email()], 
                        render_kw={"placeholder": "Enter your email"})
    
    password = PasswordField('Password', validators=[DataRequired()], 
                             render_kw={"placeholder": "Enter your password"})
    
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')], 
                                     render_kw={"placeholder": "Confirm your password"})

    submit = SubmitField('Sign Up')

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('username is taken')
    
    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('email is taken')

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=2, max=20)], 
                           render_kw={"placeholder": "Enter your username"})
    
    password = PasswordField('Password', validators=[DataRequired()], 
                             render_kw={"placeholder": "Enter your password"})
    
    # remember = BooleanField('Remember Me')
    submit = SubmitField('Sign in')
