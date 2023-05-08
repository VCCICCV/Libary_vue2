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
      <el-table-column prop="id" label="编号" width="80"></el-table-column>
      <el-table-column prop="username" label="会员号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="sex" label="性别" width="50"></el-table-column>
<!--
      <el-table-column label="状态" width="230">
        <template v-slot="scope">
          <el-switch
              v-model="scope.row.status"
              @change="changeStatus(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column> -->
      <el-table-column prop="createtime" label="创建时间"></el-table-column>
      <el-table-column prop="updatetime" label="更新时间"></el-table-column>

      <el-table-column label="操作" width="230">
        <template v-slot="scope">
          <!-- <el-button type="primary">编辑</el-button> -->
          <el-button type="primary" @click="$router.push('/editUser?id=' + scope.row.id)" size="mini">编辑</el-button>
          <el-popconfirm style="margin-left: 5px" title="确定删除？" @confirm="del(scope.row.id)">
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
export default {
  name: "User",
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
      request.get('/user/page', {
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
    del(id) {
      request.delete("/user/delete/" + id).then(res => {
        if (res.code === '200') {
          this.$notify.success('删除成功')
          this.load()
        } else {
          this.$notify.error(res.msg)
        }
      })
    },
    // handleAccountAdd(row) {
    //   this.form = JSON.parse(JSON.stringify(row))
    //   this.dialogFormVisible = true
    // },
    // addAccount() {
    //   this.$refs['ruleForm'].validate((valid) => {
    //     if (valid) {
    //       request.post('/user/account', this.form).then(res => {
    //         if (res.code === '200') {
    //           this.$notify.success('充值成功')
    //           this.dialogFormVisible = false
    //           this.load()
    //         } else {
    //           this.$notify.error(res.msg)
    //         }
    //       })
    //     }
    //   })
    // }
  }
};
</script>
