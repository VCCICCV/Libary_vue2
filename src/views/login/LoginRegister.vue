<template>
    <div>
        <div class="container">
            <div class="img1-content">
                <img class="img1" src="@/assets/img/login.png">
            </div>
            <div class="login-content">
                <div class="content-wrapper">
                    <div class="left-content">
                        <RouterView></RouterView>
                    </div>
                    <div class="right-content">
                        <nav class="nav-router">
                            <router-link to="/login" class="router1">登录</router-link>
                            <router-link to="/forgetThePassword" class="router2">忘记密码?</router-link>
                            <router-link to="/register" class="router3">注册</router-link>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "LoginRegister",
    // components: {},
    data() {
        return {
            // admin:{}
        }
    }
}
</script>
</script>
<style>
body {
  overflow: hidden; /* 隐藏滚动条 */
  height: 100vh;
  margin-bottom: 0%;
}
.img1-content{
    margin: auto;
    width: 50%;
}
.container{
    display: flex;
    justify-content: space-between;

}
.img1{
    width: 100%;
}
.title{
    text-align: center;
    margin: auto;
}
.login-content{
    width: 50%;
    margin-top: auto;
    height: 100vh;
}
.nav-router{
    display: flex;
    justify-content: space-evenly;
}
</style>
