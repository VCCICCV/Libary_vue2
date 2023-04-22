<template>
	<div>
		<el-form action="" :model="admin" :rules="rules" ref="ruleForm">
			<div class="input-div one">
				<div class="i">
					<i class="fas fa-user"></i>
				</div>
				<div class="div">
					<el-input type="text" class="input" placeholder="用户名" v-model="admin.username"></el-input>
				</div>
			</div>
			<div class="input-div pass">
				<div class="i">
					<i class="fas fa-lock"></i>
				</div>
				<div class="div">
					<el-input type="password" class="input" placeholder="密码" v-model="admin.password"></el-input>
				</div>
			</div>
			<input type="submit" class="btn" value="登录" @click="login" />
		</el-form>

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
			},
			rules: {
				username: [
					{ required: true, message: "请输入用户名", trigger: "blur" },
					{ min: 3, max: 10, message: "长度在3-10g个字符之间", trigger: "blur" }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 3, max: 10, message: "长度在3-10g个字符之间", trigger: "blur" }
				],
			},

		}
	},
	methods: {
		login() {
			this.$refs["ruleForm"].validate((valid) => {
				if (valid) {
					request.post("/admin/login", this.admin).then(res => {
						console.log('200前')
						if (res.code == '200') {
							this.$notify.success("登录成功")
							console.log('成功')
							// 到主页
							// this.$router.push('/')
							console.log('push')
							if(res.data != null){
								Cookies.set('user',JSON.stringify(res.data))
							}
						} else {
							this.$notify.error(res.msg)
						}
					})
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		}
	}

};
</script>
<style scoped>

</style>
