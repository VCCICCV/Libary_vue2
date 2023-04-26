<template>
	<div>
		<div style="width: 80%px; height: 50%; background-color: white; border-radius: 10px;
		  margin:auto; padding:50px">
			<div style="margin: 30px; text-align: center; font-size: 30px; font-weight: bold; color: dodgerblue">登 录</div>
			<el-form :model="admin" :rules="rules" ref="loginForm">
				<el-form-item prop="username">
					<el-input placeholder="请输入账号" prefix-icon="el-icon-user" size="medium"
						v-model="admin.username"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input placeholder="请输入密码" show-password prefix-icon="el-icon-lock" size="medium"
						v-model="admin.password" @keypress.enter.native="login "></el-input>
				</el-form-item>
				<el-form-item>
					<el-button style="width: 100%" size="medium" type="primary" @click="login" class="btn">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import request from "@/utils/request";
import Cookies from 'js-cookie'
export default {
    name: "Register",
    components: {},
    data() {
		return {
			loginAdmin: {},
			admin: {},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		login() {
			this.$refs['loginForm'].validate((valid) => {
				if (valid) {
					request.post('/admin/login', this.admin).then(res => {
						if (res.code === '200') {
							this.loginAdmin = res.data

							this.$notify.success("登录成功")
							Cookies.set('admin', JSON.stringify(this.loginAdmin))
							this.$router.push('/')
						} else {
							this.$notify.error(res.msg)
						}
					})
				}
			})
		},
	}
}
</script>

<style scoped>
.btn {
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    outline: none;
    border: none;
    background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
    background-size: 200%;
    font-size: 1.2rem;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    margin: 1rem 0;
    cursor: pointer;
    transition: .5s;
}

.btn:hover {
    background-position: right;
}
</style>
