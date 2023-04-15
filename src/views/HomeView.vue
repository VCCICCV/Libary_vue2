<template>
  <div>
    <!-- 搜索表单 -->
    <div style="margin-bottom: 1%">
      <el-input style="width: 240px" placeholder="请输入" v-model="params.name"></el-input>
      <el-input style="width: 240px;margin-left: 1%;" placeholder="请输入联系方式" v-model="params.phone"></el-input>
      <el-button style="margin-left: 1%" type="primary" @click="load"><i class="el-icon-search"></i>搜索</el-button>
      <el-button style="margin-left: 1%" type="warning" @click="reset"><i class="el-icon-refresh"></i>重置</el-button>
    </div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="name" lable="name"></el-table-column>
      <el-table-column prop="age" lable="年龄"></el-table-column>
      <el-table-column prop="address" lable="地址"></el-table-column>
      <el-table-column prop="phone" lable="电话"></el-table-column>
      <el-table-column prop="sex" lable="性别"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="margin-top: 2%">
      <el-pagination background
      :page-size="params.pageSize"
      :current-page="params.pageNum"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import  request  from '@/utils/request';
export default {
  name: "HomeView",
  components: {
    // HelloWorld
  },
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        name: '',
        phone: ''
      }
    };
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      // fetch('http://localhost:9090/user/list').then(res => res.json()).then(res => {
      //   console.log(res)
      //   this.tableData = res
      // })
      request.get('/user/page',{
        params: this.params
       }).then(res => {
        if (res.code === '200') {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        name: '',
        phone: ''
      }
      this.load()
    },
    handleCurrentChange(pageNum) {
      // 点击分页
      this.params.pageNum = pageNum
      this.load()
    },
  }
};
</script>
