<template>
    <div style="width: 80%">
        <div style="margin-bottom: 30px">新增借书记录</div>
        <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="标准码" prop="name">
                <el-select v-model="bookNo" filterable placeholder="请选择">
                    <el-option v-for="book in books" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图书名称" prop="bookNmae">
                <el-input v-model="form.bookNmae" placeholder="请输入图书名称"></el-input>
            </el-form-item>
            <el-form-item label="所需积分" prop="score">
                <el-input v-model="form.score"></el-input>
            </el-form-item>
            <el-form-item label="用户No" prop="userNo">
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="用户联系方式" prop="userPhone">
                <el-input v-model="form.userPhone"></el-input>
            </el-form-item>
            <el-form-item label="标准码" prop="bookNo">
                <el-input v-model="form.bookNo" placeholder="标准码"></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <el-input v-model="form.cover" placeholder="请选择封面"></el-input>
            </el-form-item>
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
        const checkNums = (rule, value, callback) => {
            value = parseInt(value)
            if (value < 0 || value >= 1000) {
                callback(new Error('请输入大于等于0小于1000的整数'));
            }
            callback()
        };
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
        request.get('/book').then(res => {
            this.books = res.data
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

    },
};
</script>
