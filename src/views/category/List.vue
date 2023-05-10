<template>
  <div>
    <!-- 搜索表单 -->
    <div style="margin-bottom: 1%">
      <el-input style="width: 240px" placeholder="请输入分类名" v-model="params.name"></el-input>
      <el-button style="margin-left: 1%" type="primary" @click="load"><i class="el-icon-search"></i>搜索</el-button>
      <el-button style="margin-left: 1%" type="warning" @click="reset"><i class="el-icon-refresh"></i>重置</el-button>
    </div>
    <!-- 列表 -->
    <!-- 表格prop写驼峰 -->
    <el-table :data="tableData" stripe row-key="id" default-expand-all>
      <el-table-column prop="id" label="编号" width="80"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="createtime" label="创建时间"></el-table-column>
      <el-table-column prop="updatetime" label="更新时间"></el-table-column>
      <!-- 状态 -->
      <el-table-column label="操作" width="280">
        <template v-slot="scope">
          <el-button type="success" @click="handleAdd(scope.row)" size="mini" v-if="!scope.row.pid">添加二级图书</el-button>
          <el-button type="primary" @click="$router.push('/editCategory?id=' + scope.row.id)" size="mini">编辑</el-button>
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
    <!-- 弹窗  -->
    <el-dialog title="添加二级图书" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" label-width="100px" ref="ruleForm" :rules="rules">
        <el-form-item label="图书名" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书备注" prop="remark">
          <el-input v-model="form.remark" autocomplete="off" @keypress.enter.native="save"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

import request from '@/utils/request';
import Cookies from 'js-cookie';
export default {
  name: "CategoryList",
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
        name: '',
      },
      rules: {
        newPass: [
          { required: true, message: '请输入图书名称', trigger: 'blur' },
        ]
      }
    };
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get('/category/page', {
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
        name:"",
      }
      this.load()
    },
    handleCurrentChange(pageNum) {
      // 点击分页
      this.params.pageNum = pageNum
      this.load()
    },
    del(id) {
      request.delete("/category/delete/" + id).then(res => {
        if (res.code === '200') {
          this.$notify.success('删除成功')
          this.load()
        } else {
          this.$notify.error(res.msg)
        }
      })
    },
    handleAdd(row) {
      // 将当前行的id作为二级图书的id
      this.pid = row.id
      // 出现弹窗
      this.dialogFormVisible = true
    },
    save() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // 给二级图书赋值 pid
          this.form.pid = this.pid
          request.post("/category/save", this.form).then((res) => {
            if (res.code === "200") {
              this.$notify.success("新增二级图书成功");
              // 清空
              this.$refs["ruleForm"].resetFields();
              // 关闭弹窗
              this.dialogFormVisible = false
              this.load()
            } else {
              this.$notify.error(res.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>
