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
from PCF8591 import PCF8591
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
    message = MessageType(messageID, PCF8591.read(0), PCF8591.read(1), PCF8591.read(2), PCF8591.read(3), "0")
    json_str = json.dumps(message, default=MessageType2dict)
    return json_str

@app.route('/line-api')
def line_api():
    return render_template('line-aqi.html')

@app.route('/line_data')
def line_data():
    return render_template('aqi-beijing.json')
@app.route('/article/<string:test>/')
def test_article(test):
    return 'test_article:{}'.format(test)

def GetChannelData(channel,period):
    list_data=[]
    for i in range(period):    
        list_data.append(PCF8591.read(channel))
        time.sleep(0.001)
    return list_data
@app.route('/getchannel/')
def getchannel():
    channel = request.args.get("channel")
    period = request.args.get("period")
    list_data=GetChannelData(channel= int(channel),period= int(period))
    json_str=json.dumps(list_data,ensure_ascii=False)
    return json_str,200
    
    #return "通过字符串查询的关键字为:{}, 页码为:{}".format(channel, period)

import threading
import time
 
tmp_value=0
def writeADC(num):
    global tmp_value
    while(1):
        tmp_value=tmp_value+1
        PCF8591.write(tmp_value)
        #print(tmp_value)
        time.sleep(0.1)


t1 = threading.Thread(target=writeADC, args=(13,))
t1.start()

if __name__ == '__main__':
    
    # 启动项目
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=8080, type=int, help='port to listen on')  # 端口

    args = parser.parse_args()
    port = args.port

    app.run(debug=True, host='0.0.0.0', port=port)
