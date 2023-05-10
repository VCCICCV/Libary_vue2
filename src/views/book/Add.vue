<template>
    <div style="width: 80%">
        <div style="margin-bottom: 30px">新增图书</div>
        <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description" >
                <el-input type="textarea"  v-model="form.description" placeholder="请输入描述" style="width:400px;"></el-input>
            </el-form-item>
            <el-form-item label="出版日期" prop="publish_date">
                <el-date-picker style="width: 85%;" v-model="form.publishDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择出版日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="form.author" placeholder="请输入作者"></el-input>
            </el-form-item>
            <el-form-item label="出版社" prop="publisher">
                <el-input v-model="form.publisher" placeholder="请输入出版社"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="category">
                <el-input v-model="form.category" placeholder="请选择分类"></el-input>
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

export default {
    name: "AddBook",
    data() {
        return {
            form: {},
            rules: {
                name: [
                    { required: true, message: "请输入分类名称", trigger: "blur" },
                ],
            },
        };
    },
    methods: {
        save() {
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    request.post("/book/save", this.form).then((res) => {
                        if (res.code === "200") {
                            this.$notify.success("新增成功");
                            // 清空
                            // this.form = {}
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
