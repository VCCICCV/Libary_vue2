<template>
    <div class="login-content">
        <form action="index.html">
            <div class="input-div one">
                <div class="i">
                    <i class="fas fa-lock"></i>
                </div>
                <div class="div">
                    <input type="text" class="input" placeholder="用户名" />
                </div>
            </div>
            <div class="input-div one">
                <div class="i">
                    <i class="fas fa-lock"></i>
                </div>
                <div class="div">
                    <input type="text" class="input" placeholder="邮箱" />
                </div>
            </div>
            <div class="input-div pass">
                <div class="i">
                    <i class="fas fa-lock"></i>
                </div>
                <div class="div">
                    <input type="password" class="input" placeholder="密码" />
                </div>
            </div>
            <input type="submit" class="btn" value="注册" />
        </form>
    </div>
</template>
<script lang="ts">
export default {
    name: "Register",
    components: {},
}
</script>

<style scoped></style>
