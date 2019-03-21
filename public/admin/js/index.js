$(function(){
    //后台返回的数据
    //map filter forEach every some nodejs
       var date={
           title:"2019年注册人数",
           list:[
            { month: '1月', count: 1000, count1: 500 },
            { month: '2月', count: 240, count1: 500 },
            { month: '3月', count: 1500, count1: 500 },
            { month: '4月', count: 2000, count1: 500 },
            { month: '5月', count: 300, count1: 500 },
            { month: '6月', count: 800, count1: 500 }
           ]
       }
    //    进行遍历
      var month=[];
      var count=[];
      var count1=[];
      
       for ( var i = 0 ; i < date.list.length ; i++) {
           
           month.push(date.list[i].month);
           count.push(date.list[i].count);
           count1.push(date.list[i].count1)
       
       }

       // 基于准备好的dom，初始化echarts实例
       var myChart = echarts.init(document.querySelector('.content .left'));

       // 指定图表的配置项和数据
       var option = {
           title: {
               text: date.title,
               textStyle:{
                   color:"lime",
               }
           },
           tooltip: {},
           legend: {
               data:['人数','在线人数']
           },
           xAxis: {
               data: month,
           },
           yAxis: {},
           series: [{
               name: '人数',
               type: 'bar',
               data: count
           },
           {
            name: '在线人数',
            type: 'bar',
            data: count1

           }
        ]
       };

       // 使用刚指定的配置项和数据显示图表。
       myChart.setOption(option);

//配置扇形图
//初始化饼图实例
var rightChart=echarts.init(document.querySelector(".content .right"));

 

  var tightoption = {
    title : {
        text: '热门品牌销售',
        subtext: '2019年3月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','阿迪王','新百伦','匡威']
    },
    series : [
        {
            name: '销售情况',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'阿迪王'},
                {value:135, name:'新百伦'},
                {value:1548, name:'匡威'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]

}
rightChart.setOption(tightoption);
});
