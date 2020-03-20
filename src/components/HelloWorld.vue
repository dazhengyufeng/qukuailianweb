<template>
  <div>
  <!-- 按钮 -->
  <el-button type="primary" @click="addBill">添加账目</el-button>
  <!-- 表格 -->
  <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="date"
      label="日期"
      width="120">
    </el-table-column>
    <el-table-column
      property="data"
      label="内容">
    </el-table-column>
  </el-table>

  <!-- 记账弹窗 -->
  <el-dialog
  title="记录账目内容"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form :model="form" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
      <el-form-item label="账单内容" prop="desc">
        <el-input type="textarea" v-model="form.content" :limit-length="100"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  </div>
</template>

<script>
import axios from '../assets/js/axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      form:{
        content:'' // 内容
      },
      dialogVisible:false,// 弹窗显示或隐藏
      // 表格内容
      tableData: [{
        date: '2016-05-02',
        data: '上海市普陀区金沙江路 1518 弄'
      }],
    }
  },
  methods:{
    // 提交
    submitForm(){
      // 提交数据
      axios.post(`/addBlock`,this.form).then(res => {
        console.log(res)
        this.dialogVisible = false
        this.$message({
          message: '账目添加成功',
          type: 'success'
        });
      })
    },
    // 取消
    resetForm(){

    },
    // 添加账单
    addBill(){
      this.dialogVisible = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-ruleForm{
  /* width: 515px; */
  margin: auto;
  /* margin-top: 60px; */
}
</style>
