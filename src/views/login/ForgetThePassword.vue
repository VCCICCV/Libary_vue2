<template>
    <div>
        <div class="input-div one">
            <div class="i">
                <i class="fas fa-user"></i>
            </div>
            <div class="div">
                <input type="text" class="input" placeholder="邮箱">
            </div>
        </div>
        <div class="input-div pass">
            <div class="i">
                <i class="fas fa-lock"></i>
            </div>
            <div class="div">
                <input type="password" class="input" placeholder="新密码">
            </div>
        </div>
        <div class="input-div verification">
            <div class="i">
                <i class="fas fa-lock"></i>
            </div>
            <div class="div">
                <input type="verif" class="input" placeholder="验证码">
            </div>
        </div>
        <input type="submit" class="btn" value="验证" />
    </div>
</template>

<script lang="ts">
export default {
    name: "ForgetThePassword",
    components: {},
};
</script>
<style scoped></style>
