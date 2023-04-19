<template>
	<div>
		<form action="" :model="admin">
			<div class="input-div one">
				<div class="i">
					<i class="fas fa-user"></i>
				</div>
				<div class="div">
					<input type="text" class="input" placeholder="邮箱" v-model="admin.email">
				</div>
			</div>
			<div class="input-div pass">
				<div class="i">
					<i class="fas fa-lock"></i>
				</div>
				<div class="div">
					<input type="password" class="input" placeholder="密码" v-model="admin.password">
				</div>
			</div>
			<input type="submit" class="btn" value="登录" @click="login"/>
		</form>

	</div>
</template>

<script>
import request from '@/utils/request';

export default {
	name: "Login",
	components: {},
	data() {
		return {
			admin: {
				email: '',
				password: '',
			}
		}
	},
	methods: {
		login() {
			request.post("/admin/login", this.admin).then(res => {
				if (res.code == '200'){
					this.$notify.success("登录成功")
					// 到主页
					this.router.push('/')
				}else{
					this.$notify.error(res.msg)
				}
			})
		}
	}

};
</script>
<style scoped></style>
