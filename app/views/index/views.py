from flask import Blueprint, render_template
from app import app

index = Blueprint('index', __name__)

@index.route('/')
def do_index():
    return render_template('index.html')