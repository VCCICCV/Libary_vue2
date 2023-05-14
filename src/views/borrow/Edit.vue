<template>
    <div style="width:80%;">
        <div style='margin-bottom:30px'>编辑分类</div>
        <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input type="textarea" v-model="form.description" placeholder="请输入描述" style="width:400px;"></el-input>
            </el-form-item>
            <el-form-item label="出版日期" prop="publish_date">
                <el-date-picker style="width: 85%;" v-model="form.publishDate" type="date" value-format="yyyy-MM-dd"
                    placeholder="请选择出版日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="form.author" placeholder="请输入作者"></el-input>
            </el-form-item>
            <el-form-item label="出版社" prop="publisher">
                <el-input v-model="form.publisher" placeholder="请输入出版社"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="category">
                <el-cascader :props="{ value: 'name', label: 'name' }" v-model="form.categories"
                    :options="categories"></el-cascader>
            </el-form-item>
            <el-form-item label="标准码" prop="bookNo">
                <el-input v-model="form.bookNo" placeholder="标准码"></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <el-input v-model="form.cover" placeholder="请选择封面"></el-input>
            </el-form-item>
        </el-form>
        <div style="margin-top: 30px; text-align: right;">
            <el-button type="primary" @click="save">提交</el-button>
        </div>
    </div>
</template>
<script>
import request from '@/utils/request';
import Cookies from 'js-cookie';
export default {
    name: 'EditBorrow',
    data() {
        return {
            admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
            form: {},
            categories: [],
            rules: {
                name: [
                    { required: true, message: '请输入图书名称', trigger: 'blur' }
                ],
                bookNo: [
                    { required: true, message: '请输入图书标准码', trigger: 'blur' }
                ],
                score: [
                    { required: true, message: '请输入借书积分', trigger: 'blur' }
                ]
            },
        }
    },
    created() {
        request.get('/category/tree').then(res => {
            this.categories = res.data
        })

        const id = this.$route.query.id
        request.get("/book/" + id).then(res => {
            this.form = res.data
            if (this.form.category) {
                this.form.categories = this.form.category.split(' > ')
                console.log(this.form.categories)
            }
        })
    },
    methods: {
        handleCoverSuccess(res) {
            if (res.code === '200') {
                this.form.cover = res.data
            }
        },
        save() {
            request.put('/book/update', this.form).then(res => {
                if (res.code === '200') {
                    this.$notify.success('更新成功')
                    this.$router.push("/bookList")
                } else {
                    this.$notify.error(res.msg)
                }
            })
        }
    }
}
</script>