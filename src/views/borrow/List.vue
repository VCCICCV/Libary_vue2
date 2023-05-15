<template>
  <div>
    <!-- 搜索表单 -->
    <div style="margin-bottom: 1%">
      <el-input style="width: 240px" placeholder="请输入图书名称" v-model="params.name"></el-input>
      <el-input style="width: 240px;margin-left: 5px;" placeholder="请输入图书编码" v-model="params.bookNo"></el-input>
      <el-button style="margin-left: 1%" type="primary" @click="load"><i class="el-icon-search"></i>搜索</el-button>
      <el-button style="margin-left: 1%" type="warning" @click="reset"><i class="el-icon-refresh"></i>重置</el-button>
    </div>
    <!-- 列表 -->
    <!-- 表格prop写驼峰 -->
    <el-table :data="tableData" stripe row-key="id" default-expand-all style="height:550px; overflow-y: scroll;">
      <el-table-column prop="id" label="编号" width="80"></el-table-column>
      <el-table-column prop="bookName" label="图书名称"></el-table-column>
      <el-table-column prop="bookNo" label="标准码" width="250"></el-table-column>
      <el-table-column prop="userNo" label="会员码"></el-table-column>
      <el-table-column prop="userName" label="用户名称"></el-table-column>
      <el-table-column prop="userPhone" label="联系方式"></el-table-column>
      <el-table-column prop="createtime" label="创建时间"></el-table-column>
      <el-table-column prop="updatetime" label="标准码"></el-table-column>
      <el-table-column prop="score" label="积分"></el-table-column>
      <el-table-column prop="status" label="借书状态"></el-table-column>
      <el-table-column prop="days" label="借书天数"></el-table-column>

      <!-- 状态 -->
      <el-table-column label="操作" width="280">
        <template v-slot="scope">

          <el-button type="primary" @click="$router.push('/editBook?id=' + scope.row.id)" size="mini">编辑</el-button>
          <el-popconfirm title="确定删除？" @confirm="del(scope.row.id)">
            <el-button type="danger" slot="reference" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="margin-top: 2%">
      <el-pagination background :page-size="params.pageSize" :current-page="params.pageNum"
        @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import request from '@/utils/request';
import Cookies from 'js-cookie';
export default {
  name: "BorrowList",
  components: {
  },
  data() {
    return {
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      form: {},
      pid: null,
      params: {
        pageNum: 1,
        pageSize: 10,
        bookName: '',
        bookNo: "",
        userName:"",
      },
      // rules: {
      //   borrowName:[{required:true,message:'请输入图书名称',trigger:'blur'}]
      // }
    };
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get('/borrow/page', {
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
        name: "",
        borrowNo: "",
      }
      this.load()
    },
    handleCurrentChange(pageNum) {
      // 点击分页
      this.params.pageNum = pageNum
      this.load()
    },
    del(id) {
      request.delete("/borrow/delete/" + id).then(res => {
        if (res.code === '200') {
          this.$notify.success('删除成功')
          this.load()
        } else {
          this.$notify.error(res.msg)
        }
      })
    },
  }
};
</script>
