<template>
  <div>
    <div>主页</div>
    <el-card>
      <div id="line" style="width:100%;height: 400px;"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import  request  from '@/utils/request';
export default {
  name: "HomeView",
  components: {
  },
  data(){
    return{
      lineBox:null,
      timeRange:'week',
      options:[
        {label:'最近一周',value:'week'},
        {label:'最近一个月',value:'month'},
        {label:'最近两个月',value:'month2'},
        {label:'最近三个月',value:'month3'},
    ]
    }
  },
  // 初始化完后执行
  mounted(){
    this.load()
  },
  methods:{
    load(){
      if(!this.lineBox0){
        this.lineBox = echarts.init(document.getElementById('line'))//初始化容器
      }
      //从后台获取数据
      request.get('/borrow.lineCharts/'+this,timeRange).then(res =>{
        option.xAxis[0].data = res.data.borrow
        option.series[1].data = res.data.return
        this.lineBox.setOption(option)//设置容器属性值
      })

    }
  }
};

option = {
  title: {
    text: '借还书'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['借书', '还书']
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
    type: '日期',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '借书数量',
      type: 'line',
      stack: 'Total',
      smooth:true,
      data: []
    },
    {
      name: '还数数量',
      type: 'line',
      stack: 'Total',
      smooth:true,
      data: []
    },
  ]
};


</script>
