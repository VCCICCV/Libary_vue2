<template>
    <div>
        <!-- 头部 -->
        <div style="height: 60px;line-height: 60px;background-color: #5698c3;margin-bottom: 2px; display:flex;">
            <div>
                <img src="@/assets/img/libary01.svg" alt="" style="width:40px;position:relative;top: 10px;left: 20px;">
                <span style="margin-left: 20px;font-size: 24px;">图书管理系统</span>
            </div>
            <div style="flex:1;text-align:right; padding-right:20px;">
                <el-dropdown size="medium">
                    <span class="el-dropdown-link" style="cursor:pointer">
                        {{ admin.username }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><div style="width:50px; text-align:center;" @click="logout">退出</div></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

        </div>
        <!-- 侧边栏和主体 -->
        <div style="display: flex;">
            <!-- 导航 -->
            <div style="width:200px;min-height:calc(100vh-60px);overflow: hidden;margin-right: 2px;">

                <el-menu :default-active="$route.path" router class="el-menu-demo">
                    <el-menu-item index="/">
                        <i class="el-icon-eleme"></i>
                        <span>首页</span>
                    </el-menu-item>
                    <el-submenu index="user">
                        <template slot="title">
                            <i class="el-icon-question"></i>
                            <span>会员管理</span>
                        </template>
                        <el-menu-item index="/addUser">会员添加</el-menu-item>
                        <el-menu-item index="/userList">会员列表</el-menu-item>
                    </el-submenu>

                    <el-submenu index="admin">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span>管理员管理</span>
                        </template>
                        <el-menu-item index="/addAdmin">管理员添加</el-menu-item>
                        <el-menu-item index="/adminList">管理员列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="category">
                        <template slot="title">
                            <i class="el-icon-notebook-2"></i>
                            <span>分类管理</span>
                        </template>
                        <el-menu-item index="/addCategory">图书分类添加</el-menu-item>
                        <el-menu-item index="/categoryList">图书分类列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="book">
                        <template slot="title">
                            <i class="el-icon-notebook-1"></i>
                            <span>图书管理</span>
                        </template>
                        <el-menu-item index="/addBook">图书添加</el-menu-item>
                        <el-menu-item index="/bookList">图书列表</el-menu-item>
                    </el-submenu>
                </el-menu>

            </div>
            <!-- 主体 -->
            <div style="flex:1; width: 0;padding: 10px;">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
export default{
    name:"Layout",
    data(){
        return{
            admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {}
        }
    },
    methods:{
        logout(){
            this.$router.push('/loginRegister')
            // 清除数据
            Cookies.remove('admin')
        }
    },
}
</script>
<style>
</style>
