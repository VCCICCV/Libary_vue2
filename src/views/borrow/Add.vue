<template>
    <div style="width: 80%">
        <div style="margin-bottom: 30px">新增借书记录</div>
        <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="图书标准码" prop="bookNo">
                <el-select v-model="form.bookNo" clearable filterable placeholder="请选择" @select="selBook">
                    <el-option v-for="item in books" :key="item.id" :label="item.bookNo" :value="item.bookNo">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图书名称" prop="name">
                <el-input v-model="form.bookName" placeholder="图书名称" disabled></el-input>
            </el-form-item>
            <el-form-item label="所需积分" prop="score">
                <el-input v-model="form.score" disabled></el-input>
            </el-form-item>
            <el-form-item label="会员码" prop="userNo">
                <el-select v-mode="form.userNo" filterable placeholder="请选择" @change="selUser">
                    <el-option v-for="item in users" :key="item.id" :label="item.username"
                        :value="item.username"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.userName" placeholder="请输入用户名" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户联系方式" prop="userPhone">
                <el-input v-model="form.userPhone" disabled></el-input>
            </el-form-item>
            <!-- <el-form-item label="用户账户积分" prop="account">
                <el-input disabled v-model="form.account"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="借出的天数" prop="days">
                <el-input-number v-model="form.days" :min="1" :max="30" label="借出的天数"></el-input-number>
            </el-form-item> -->
        </el-form>
        <div style="margin-top: 30px; text-align: right">
            <el-button type="primary" @click="save">提交</el-button>
        </div>
    </div>
</template>
<script>
import request from "@/utils/request";
import Cookies from "js-cookie";
export default {
    name: "AddBorrow",
    data() {
        return {
            admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
            form: { days: 1 },
            books: [],
            users: [],
            rules: {
                bookNo: [
                    { required: true, message: '请输入图书标准码', trigger: 'blur' }
                ],
                userNo: [
                    { required: true, message: '请输入会员码', trigger: 'blur' }
                ]
            },
        };
    },
    created() {
        request.get('/book/list').then(res => {
            this.books = res.data
        })
        request.get('/user/list').then(res => {
            this.users = res.data.filter(v => v.status)
        })
    },
    methods: {
        handleCoverSuccess(res) {
            if (res.code === '200') {
                console.log(res.data)
                this.form.cover = res.data
            }
        },
        save() {
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    request.post("/book/save", this.form).then((res) => {
                        if (res.code === "200") {
                            this.$notify.success("新增成功");
                            this.$refs["ruleForm"].resetFields();
                        } else {
                            this.$notify.error(res.msg);
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        selBook() {
            const book = this.books.find(v => v.bookNo === this.form.bookNo)
            request.get('/book/' + book.id).then(res => {
                this.$set(this.form, 'bookName', res.data.name)
                this.form.score = res.data.score
                this.form.nums = res.data.nums
            })
        },
        selUser() {
            const user = this.users.find(v => v.username === this.form.userNo)
            request.get('/user/' + user.id).then(res => {
                this.$set(this.form, 'username', res.data.name)
                this.form.userName = res.data.name
                this.form.userPhone = res.data.phone
                // this.form.account = res.data.account
            })
        },

    },
};
</script>
