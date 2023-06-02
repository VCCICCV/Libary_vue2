<template>
  <div>
    <div>主页</div>
    <div>
      <el-select class="input" v-model="timeRange" placeholder="请选择" @change="load()">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>
    </div>
    <el-card>
      <div id="line" style="width:100%;height: 400px;"></div>
    </el-card>


  </div>
</template>

<script>
import * as echarts from 'echarts';
import  request  from '@/utils/request';
import Cookies from 'js-cookie'
const option = {
  title: {
    text: '借还书'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['借书数量', '还书数量']
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
    type: 'category',
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
      name: '还书数量',
      type: 'line',
      stack: 'Total',
      smooth:true,
      data: []
    },
  ]
};

export default {
  name: "HomeView",
  data(){
    return{
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
      lineBox:null,
      timeRange:'week',//时间范围
      options:[
        {label:'最近一周',value:'week'},
        {label:'最近一个月',value:'month'},
        {label:'最近两个月',value:'month2'},
        {label:'最近三个月',value:'month3'},
    ],

    }
  },
  // 初始化完后执行
  mounted(){
    this.load()
  },
  methods:{
    load(){
      if(!this.lineBox){
        this.lineBox = echarts.init(document.getElementById('line'))//初始化容器
      }
      //从后台获取数据
      request.get('/borrow/lineCharts/'+ this.timeRange).then(res =>{
        option.xAxis.data = res.data.date
        option.series[0].data = res.data.borrow
        option.series[1].data = res.data.retur
        this.lineBox.setOption(option)//设置容器属性值
      })

    }
  }
};




</script>
<style>
.input {
  width: 300px;
}
</style>