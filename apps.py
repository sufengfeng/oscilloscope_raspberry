# config=utf-8
import _thread
import copy
import json
import sys
import time
import os
from argparse import ArgumentParser

from flask import Flask
from flask import render_template, request, redirect

from json_message import *
app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
static_dir = os.path.join(BASE_DIR, 'static')
templates_dir = os.path.join(BASE_DIR, 'templates')

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')
messageID=0
@app.route('/getdata')
def getdata():
    global messageID
    messageID=messageID+1
    message = MessageType(messageID, "222", "333", "444", "555", "6")
    json_str = json.dumps(message, default=MessageType2dict)
    return json_str

if __name__ == '__main__':
    # 启动项目
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=8080, type=int, help='port to listen on')  # 端口

    args = parser.parse_args()
    port = args.port

    app.run(debug=True, host='0.0.0.0', port=port)
