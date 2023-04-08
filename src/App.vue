<template>
  <div id="app">
    <!-- 头部 -->
    <div style="height: 60px;line-height: 60px;background-color: #e2c17c;margin-bottom: 2px;">
      <img src="@/assets/img/libary01.svg" alt="" style="width:40px;position:relative;top: 10px;left: 20px;">
      <span style="margin-left: 20px;font-size: 24px;">图书管理系统</span>
    </div>
    <!-- 侧边栏和主体 -->
    <div style="display: flex;">
      <!-- 导航 -->
      <div style="width:200px;min-height:calc(100vh-60px);overflow: hidden;margin-right: 2px;background-color:#e2c17c;">

        <el-menu :default-active="this.$route.path" :default-openeds="['/']" router class="el-menu-demo" style="background-color:#b5aa90;">
          <el-menu-item index="/2">
            <i class="el-icon-office-building"></i>
            <span>首页</span>
          </el-menu-item>
          <el-submenu index="/2">
            <template slot="title">
              <i class="el-icon-goblet-full"></i>
              <span>关于页面</span>
            </template>
            <el-menu-item index="about" style="background-color:#b5aa90;">关于详情</el-menu-item>
          </el-submenu>
        </el-menu>

      </div>
      <!-- 主体 -->
      <div style="flex:1;background-color: #b5aa90;padding: 10px;">
        <router-view/>
      </div>
    </div>
  </div>
</template>