/*!
 * Project : simply-countdown
 * File : simplyCountdown
 * Date : 27/06/2015
 * License : MIT
 * Version : 1.3.2
 * Author : Vincent Loy <vincent.loy1@gmail.com>
 * Contributors : 
 *  - Justin Beasley <JustinB@harvest.org>
 *  - Nathan Smith <NathanS@harvest.org>
 */
 var data = [[],[],[],[],[]];

var obj ;
var j=0;
function randomData() {
//{"temperature": "25.7", "cpu_temp": 51.121, "humidity": "31.0", "t18b20_temp": 1, "temperature_F": 78.25999999999999, "message_id": 29893}
    j = j+1;
    return [{
        name:"cpu",
        value: [
            obj.message_id,
            obj.cpu_temp.toFixed(2)
        ]
    },{
        name:"温度",
        value: [
            obj.message_id,
            obj.temperature
        ]
    },{
        name:"华氏温度",
        value: [
            obj.message_id,
            obj.temperature_F.toFixed(2)
        ]
    },{
        name:"湿度",
        value: [
            obj.message_id,
            obj.humidity
        ]
    },{
        name:"DS18b20",
        value: [
            obj.message_id,
            obj.t18b20_temp
        ]
    }];
}

option = {
    title: {

        text: '动态数据',
        textStyle: {
        color: '#5E94A2' // 颜色     
         }

    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
    legend: {
        data: ['CPU', '温度', '华氏温度', '湿度', 'DS18b20'],
        textStyle: {
            color: '#ccc'
        },
        icon:'rect',
        itemWidth:20,
        itemHeight:20,

    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'value',
//       	boundaryGap: [20000],
//        min:26170,
        splitLine: {
            show: false
        },
         axisLine: {
            lineStyle: {
                color: '#9222DD', // 颜色
                width: 1 // 粗细
            }
         }
    },
    yAxis: {
        type: 'value',

        splitLine: {
            show: false
        },
         axisLine: {
            lineStyle: {
                color: '#9222DD', // 颜色
                width: 1 // 粗细
            }
         }
    },
    series: [{

        name: 'CPU',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data[0],
        },
    {
        name: '温度',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data[1],

    },{
        name: '华氏温度',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data[2],
        },
    {
        name: '湿度',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data[3],

    },{
        name: 'DS18b20',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data[4],

    }]
};
/*global window, document*/
(function (exports) {
    'use strict';

    var // functions
        extend,
        createElements,
        createCountdownElt,
        simplyCountdown;

    /**
     * Function that merge user parameters with defaults one.
     * @param out
     * @returns {*|{}}
     */
    extend = function (out) {
        var i,
            obj,
            key;
        out = out || {};

        for (i = 1; i < arguments.length; i += 1) {
            obj = arguments[i];

            if (obj) {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object') {
                            extend(out[key], obj[key]);
                        } else {
                            out[key] = obj[key];
                        }
                    }
                }
            }
        }

        return out;
    };

    /**
     * Function that create a countdown section
     * @param countdown
     * @param parameters
     * @param typeClass
     * @returns {{full: (*|Element), amount: (*|Element), word: (*|Element)}}
     */
    createCountdownElt = function (countdown, parameters, typeClass) {
        var innerSectionTag,
            sectionTag,
            amountTag,
            wordTag;

        sectionTag = document.createElement('div');
        amountTag = document.createElement('span');
        wordTag = document.createElement('span');
        innerSectionTag = document.createElement('div');

        innerSectionTag.appendChild(amountTag);
        innerSectionTag.appendChild(wordTag);
        sectionTag.appendChild(innerSectionTag);

        sectionTag.classList.add(parameters.sectionClass);
        sectionTag.classList.add(typeClass);
        amountTag.classList.add(parameters.amountClass);
        wordTag.classList.add(parameters.wordClass);

        countdown.appendChild(sectionTag);

        return {
            full: sectionTag,
            amount: amountTag,
            word: wordTag
        };
    };

    /**
     * Function that create full countdown DOM elements calling createCountdownElt
     * @param parameters
     * @param countdown
     * @returns {{days: (*|Element), hours: (*|Element), minutes: (*|Element), seconds: (*|Element)}}
     */
    createElements = function (parameters, countdown) {
        var spanTag;

        if (!parameters.inline) {
            return {
                days: createCountdownElt(countdown, parameters, 'simply-days-section'),
                hours: createCountdownElt(countdown, parameters, 'simply-hours-section'),
                minutes: createCountdownElt(countdown, parameters, 'simply-minutes-section'),
                seconds: createCountdownElt(countdown, parameters, 'simply-seconds-section'),
                msg_id: createCountdownElt(countdown, parameters, 'simply-days-section'),
                cpu_temp: createCountdownElt(countdown, parameters, 'simply-hours-section')
            };
        }

        spanTag = document.createElement('span');
        spanTag.classList.add(parameters.inlineClass);
        return spanTag;
    };

    /**
     * simplyCountdown, create and display the coundtown.
     * @param elt
     * @param args (parameters)
     */
    simplyCountdown = function (elt, args) {
        var parameters = extend({
                year: 2015,
                month: 6,
                day: 28,
                hours: 0,
                minutes: 0,
                seconds: 0,
                words: {
                    days: 'day',
                    hours: 'hour',
                    minutes: 'minute',
                    seconds: 'second',
                    pluralLetter: 's'
                },
                plural: true,
                inline: false,
                enableUtc: true,
                onEnd: function () {
                    return;
                },
                refresh: 500,
                inlineClass: 'simply-countdown-inline',
                sectionClass: 'simply-section',
                amountClass: 'simply-amount',
                wordClass: 'simply-word',
                zeroPad: false
            }, args),
            interval,
            targetDate,
            targetTmpDate,
            now,
            nowUtc,
            secondsLeft,
            days,
            hours,
            minutes,
            seconds,
            cd = document.querySelectorAll(elt);

        targetTmpDate = new Date(
            parameters.year,
            parameters.month - 1,
            parameters.day,
            parameters.hours,
            parameters.minutes,
            parameters.seconds
        );

        if (parameters.enableUtc) {
            targetDate = new Date(
                targetTmpDate.getUTCFullYear(),
                targetTmpDate.getUTCMonth(),
                targetTmpDate.getUTCDate(),
                targetTmpDate.getUTCHours(),
                targetTmpDate.getUTCMinutes(),
                targetTmpDate.getUTCSeconds()
            );
        } else {
            targetDate = targetTmpDate;
        }

        Array.prototype.forEach.call(cd, function (countdown) {
            var fullCountDown = createElements(parameters, countdown),
                refresh;

            refresh = function () {
                var dayWord,
                    hourWord,
                    minuteWord,
                    secondWord;

                now = new Date();
                if (parameters.enableUtc) {
                    nowUtc = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
                        now.getHours(), now.getMinutes(), now.getSeconds());
                    secondsLeft = (targetDate - nowUtc.getTime()) / 1000;

                } else {
                    secondsLeft = (targetDate - now.getTime()) / 1000;
                }

                if (secondsLeft > 0) {
                    days = parseInt(secondsLeft / 86400, 10);
                    secondsLeft = secondsLeft % 86400;

                    hours = parseInt(secondsLeft / 3600, 10);
                    secondsLeft = secondsLeft % 3600;

                    minutes = parseInt(secondsLeft / 60, 10);
                    seconds = parseInt(secondsLeft % 60, 10);
                } else {
                    days = 0;
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                    window.clearInterval(interval);
                    parameters.onEnd();
                }

                if (parameters.plural) {
                    dayWord = days > 1
                        ? parameters.words.days + parameters.words.pluralLetter
                        : parameters.words.days;

                    hourWord = hours > 1
                        ? parameters.words.hours + parameters.words.pluralLetter
                        : parameters.words.hours;

                    minuteWord = minutes > 1
                        ? parameters.words.minutes + parameters.words.pluralLetter
                        : parameters.words.minutes;

                    secondWord = seconds > 1
                        ? parameters.words.seconds + parameters.words.pluralLetter
                        : parameters.words.seconds;

                } else {
                    dayWord = parameters.words.days;
                    hourWord = parameters.words.hours;
                    minuteWord = parameters.words.minutes;
                    secondWord = parameters.words.seconds;
                }

                /* display an inline countdown into a span tag */
                if (parameters.inline) {
                    countdown.innerHTML =
                        days + ' ' + dayWord + ', ' +
                        hours + ' ' + hourWord + ', ' +
                        minutes + ' ' + minuteWord + ', ' +
                        seconds + ' ' + secondWord + '.';

                } else {
                      var xhr=new XMLHttpRequest();
                      //接受响应
                      xhr.onreadystatechange=function(){
                        if(xhr.readyState == 4 && xhr.status == 200){
                            var result=xhr.response;
                           //在这里面写就行了，你打印出来response
                           //console.log(result);


                         obj =JSON.parse(result)

                        fullCountDown.days.amount.textContent = (parameters.zeroPad && days.toString().length < 2 ? '0' : '') + obj.message_id;
                        fullCountDown.days.word.textContent = "消息ID";

                        fullCountDown.hours.amount.textContent = (parameters.zeroPad && hours.toString().length < 2 ? '0' : '') + obj.cpu_temp.toFixed(2)+"℃";
                        fullCountDown.hours.word.textContent = "cpu温度";

                        fullCountDown.minutes.amount.textContent = (parameters.zeroPad && minutes.toString().length < 2 ? '0' : '') + obj.temperature+"℃";
                        fullCountDown.minutes.word.textContent = "温度";

                         fullCountDown.seconds.amount.textContent = (parameters.zeroPad && days.toString().length < 2 ? '0' : '') + obj.temperature_F.toFixed(2)+"F";
                        fullCountDown.seconds.word.textContent = "华氏温度";

                        fullCountDown.msg_id.amount.textContent = (parameters.zeroPad && hours.toString().length < 2 ? '0' : '') + obj.humidity+"%";
                        fullCountDown.msg_id.word.textContent = "湿度";

                        fullCountDown.cpu_temp.amount.textContent = (parameters.zeroPad && minutes.toString().length < 2 ? '0' : '') + obj.t18b20_temp;
                        fullCountDown.cpu_temp.word.textContent = "DS18b20";
                        }
                      }
                      // 创建请求
                      xhr.open('get',"http://127.0.0.1:8001/gettemp",true);
                      //发送请求
                      xhr.send();

                }
            };

            // Refresh immediately to prevent a Flash of Unstyled Content
            refresh();
            interval = window.setInterval(refresh, parameters.refresh);
        });
    };

    exports.simplyCountdown = simplyCountdown;
}(window));

/*global $, jQuery, simplyCountdown*/
if (window.jQuery) {
    (function ($, simplyCountdown) {
        'use strict';

        function simplyCountdownify(el, options) {
            simplyCountdown(el, options);
        }

        $.fn.simplyCountdown = function (options) {
            return simplyCountdownify(this.selector, options);
        };
    }(jQuery, simplyCountdown));
}

setInterval(function () {

var dom = document.getElementById("dynamic-display");
    var myChart = echarts.init(dom);
    if(obj.message_id>2000)
        option.xAxis.min=obj.message_id-800;
    myChart.setOption(option, true);

    var dataObj = randomData();
    for (i = 0; i < 5; i++) {
        data[i].push(dataObj[i]);
     }
    myChart.setOption({
        series: [{
            data: data[0]
        },{
            data: data[1]
        },{
            data: data[2]
        },{
            data: data[3]
        },{
            data: data[4]
        }]
    });

}, 1000);