
import { RouterView } from 'vue-router';

<template>
  <div id="app">
    <!-- 头部 -->
    <div style="height: 60px;line-height: 60px;background-color: #5698c3;margin-bottom: 2px;">
      <img src="@/assets/img/libary01.svg" alt="" style="width:40px;position:relative;top: 10px;left: 20px;">
      <span style="margin-left: 20px;font-size: 24px;">图书管理系统</span>
    </div>
    <!-- 侧边栏和主体 -->
    <div style="display: flex;">
      <!-- 导航 -->
      <div style="width:200px;min-height:calc(100vh-60px);overflow: hidden;margin-right: 2px;background-color:#93b5cf;">

        <el-menu :default-active="$route.path === '/' ? $route.path : $route.path.substring(1)" :default-openeds="['/']" router class="el-menu-demo" style="background-color:#baccd9;">
          <el-menu-item index="/">
            <i class="el-icon-eleme"></i>
            <span>首页</span>
          </el-menu-item>
          <el-submenu index="/">
            <template slot="title">
              <i class="el-icon-question"></i>
              <span>会员管理</span>
            </template>
            <el-menu-item index="addUser">会员添加</el-menu-item>
            <el-menu-item index="user" style="background-color:##93b5cf;">会员列表</el-menu-item>
          </el-submenu>

          <el-submenu index="/">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>管理员管理</span>
            </template>
            <el-menu-item index="addAdmin">管理员添加</el-menu-item>
            <el-menu-item index="admin" style="background-color:##93b5cf;">管理员列表</el-menu-item>
          </el-submenu>
        </el-menu>

      </div>
      <!-- 主体 -->
      <div style="flex:1;background-color: ##baccd9;padding: 10px;">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>