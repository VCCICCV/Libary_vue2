<template>
  <div>
    <!-- 搜索表单 -->
    <div style="margin-bottom: 1%">
      <el-input style="width: 240px" placeholder="请输入用户名" v-model="params.username"></el-input>
      <el-input style="width: 240px;margin-left: 1%;" placeholder="请输入联系方式" v-model="params.phone"></el-input>
      <el-input style="width: 240px;margin-left: 1%;" placeholder="请输入邮箱" v-model="params.email"></el-input>
      <el-button style="margin-left: 1%" type="primary" @click="load"><i class="el-icon-search"></i>搜索</el-button>
      <el-button style="margin-left: 1%" type="warning" @click="reset"><i class="el-icon-refresh"></i>重置</el-button>
    </div>
    <!-- 列表 -->
    <el-table :data="tableData" stripe style="height:500px; overflow-y: scroll;">
      <el-table-column prop="id" label="编号" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="createtime" label="创建时间"></el-table-column>
      <el-table-column prop="updatetime" label="更新时间"></el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态" width="50">
        <template v-slot="scope">
          <el-switch v-model="scope.row.status" @change="changeStatus(scope.row)" active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template v-slot="scope">
          <el-button type="primary" @click="$router.push('/editAdmin?id=' + scope.row.id)" size="mini">编辑</el-button>
          <el-popconfirm title="确定删除？" @confirm="del(scope.row.id)">
            <el-button type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
          <el-button style="margin-left: 5px" type="warning" @click="handleChangePass(scope.row)"
            size="mini">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="margin-top: 2%">
      <el-pagination background :page-size="params.pageSize" :current-page="params.pageNum"
        @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <!-- 弹窗  -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" label-width="100px" ref="formRef" :rules="rules">
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="form.newPass" autocomplete="off" show-password @keypress.enter.native="savePass"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

import request from '@/utils/request';
import Cookies from 'js-cookie';
export default {
  name: "AdminList",
  components: {
  },
  data() {
    return {
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
      tableData: [],
      total: 0,
      form: {},
      dialogFormVisible: false,
      params: {
        pageNum: 1,
        pageSize: 10,
        username: '',
        phone: '',
        email: ''
      },
      rules: {
        newPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get('/admin/page', {
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
        username: '',
        phone: '',
        email: '',
      }
      this.load()
    },
    handleCurrentChange(pageNum) {
      // 点击分页
      this.params.pageNum = pageNum
      this.load()
    },
    del(id) {
      request.delete("/admin/delete/" + id).then(res => {
        if (res.code === '200') {
          this.$notify.success('删除成功')
          this.load()
        } else {
          this.$notify.error(res.msg)
        }
      })
    },
    // 管理员状态
    changeStatus(row) {
      if (this.admin.id === row.id && !row.status) {
        row.status = true
        this.$notify.warning('您的操作不合法')
        return
      }
      request.put('/admin/update', row).then(res => {
        if (res.code === '200') {
          this.$notify.success('操作成功')
          this.load()
        } else {
          this.$notify.error(res.msg)
        }
      })
    },
    handleChangePass(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    savePass() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          request.put('/admin/password', this.form).then(res => {
            if (res.code === '200') {
              this.$notify.success("修改成功")
              // 当前修改的用户id 等于当前登录的管理员id，那么修改成功之后需要重新登录
              if (this.form.id === this.admin.id) {
                Cookies.remove('admin')
                this.$router.push('/login')
              } else {
                this.load()
                this.dialogFormVisible = false
              }
            } else {
              this.$notify.error("修改失败")
            }
          })
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
