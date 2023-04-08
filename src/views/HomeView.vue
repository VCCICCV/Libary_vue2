<template>
  <div>
    <!-- 搜索表单 -->
    <div style="margin-bottom: 1%">
      <el-input style="width: 240px" placeholder="请输入"></el-input>
      <el-input
        style="width: 240px;margin-left: 1%; placeholder='请输入联系方式'"></el-input>
      <el-button style="margin-left: 1%" type="primary"
        ><i class="el-icon-search"></i>搜索</el-button
      >
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
      <el-pagination
        background
        :page-size="5"
        layout="prev, pager, next"
        :total="100"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {
    // HelloWorld
  },
  data() {
    return {
      tableData: [
        {
          name: "张三",
          age: 20,
          address: "上海",
          phone: "17671922554",
          sex: "男",
        },
        {
          name: "张三",
          age: 20,
          address: "上海",
          phone: "17671922554",
          sex: "男",
        },
        {
          name: "张三",
          age: 20,
          address: "上海",
          phone: "17671922554",
          sex: "男",
        },
        {
          name: "张三",
          age: 20,
          address: "上海",
          phone: "17671922554",
          sex: "男",
        },
      ],
    };
  },
};
</script>
