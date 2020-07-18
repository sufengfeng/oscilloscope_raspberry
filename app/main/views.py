from flask import render_template
#导入蓝本 main
from . import main

@main.route('/')
def index():    
    return render_template('index.html')
