function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    };
}

var data = [];
var now = new Date();
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
    data.push(randomData());
}

option = {
    title: {
        text: '实时消息ID',
        textStyle:{
            color: '#ddd'
        },
        textAlign: 'left'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        },
        axisLine:{
            lineStyle:{
                color:'#ddd'
            }
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        },
        axisLine:{
            lineStyle:{
                color:'#ddd'
            }
        }
    },
    series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data
    }]
};

//setInterval(function () {
//    var dom = document.getElementById("dynamic-display");
//    var myChart = echarts.init(dom);
//    myChart.setOption(option, true);
//    for (var i = 0; i < 5; i++) {
//        data.shift();
//        data.push(randomData());
//    }
//
//    myChart.setOption({
//        series: [{
//            data: data
//        }]
//    });
//}, 1000);

var drillDown = {
    getOption : function () {
        var option = null;
                option = {
                    title: {
                        text: '折线图下钻示例',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c}'
                    },
                    legend: {
                        left: 'left',
                        data: ['月数据']
                    },
                    xAxis: {
                        type: 'category',
                        name: 'x',
                        splitLine: {show: false},
                        data: ['201601', '201602', '201603', '201604', '201605', '201606', '201607', '201608', '201609']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'log',
                        name: 'y'
                    },
                    series: [
                        {
                            name: '月数据',
                            type: 'line',
                            data: [1, 2, 4, 8, 16, 32, 64, 128, 256]
                        }
                    ]
                };
                return option;
    },
    initChart : function (myChart,option) {
        myChart.setOption(option);
        myChart.on('click',function(object){
          // 销毁之前的echarts实例
        echarts.dispose(dom);
        // 初始化一个新的实例
        var myChart = echarts.init(dom);
        // object为当前的这个echart对象，大家可以自己打印出来看看
        // console.dir(object);
        // 我们可以看到name属性即为当前点击点的对应月份值，那么我们可以通过这个值去接口查询对应201609月份下的每一天的值.
        // 此处的201609月份数据可以通过接口读取
        // $.ajax(
        //     type : 'get',
        //     url : interfaceUrl + '&month=' + object.name, // 此处可以替换为你的接口地址
        //     dataType : 'json',
        //     success : function (msg){
        //         option.xAxis.data = msg.xAxis;
        //         option.series[0].data = msg.yAxis[0];
        //         myChart.setOption(option, true);
        //     }
        // );

        // 我这里就模拟一个测试数据，做为demo演示
        option.xAxis.data = [
        '2016-09-01','2016-09-02','2016-09-03','2016-09-04','2016-09-05','2016-09-06','2016-09-07','2016-09-08',
        '2016-09-09','2016-09-10','2016-09-11','2016-09-12','2016-09-13','2016-09-14','2016-09-15','2016-09-16',
        '2016-09-17','2016-09-18','2016-09-19','2016-09-20','2016-09-21','2016-09-22','2016-09-23','2016-09-24',
        '2016-09-25','2016-09-26','2016-09-27','2016-09-28','2016-09-29','2016-09-30'
        ];
        option.series[0].data = [
            3,4,5,6,5,6,7,8,8,9,
            12,13,15,16,20,12,30,21,22,29,
            30,31,33,34,35,36,20,29,33,40
        ];
        myChart.setOption(option, true);
    });
  },
};
