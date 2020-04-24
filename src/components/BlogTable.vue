<template>
  <div class="contentTable">
    <!-- 按钮 -->
    <el-button type="primary" @click="addBill" size='small' class="addBtn">开始挖矿</el-button>

    <!-- 表格 -->
    <div class="table">
      <el-table
        ref="singleTable"
        :data="tableData"
        border
        :header-cell-style="getRowClass"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          property="date"
          label="日期"
          width="200">
        </el-table-column>
        <el-table-column
          property="data"
          label="内容">
        </el-table-column>
      </el-table>
    </div>

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
      tableData: [],
    }
  },
  methods:{
    // 提交
    submitForm(){
      // 提交数据
      axios.post(`/addBlock`,this.form).then(res => {
        console.log(res)
        this.tableData = res.data
        this.dialogVisible = false
        this.$message({
          message: '账目添加成功',
          type: 'success'
        });
      })
    },
    // 取消
    resetForm(){
      this.dialogVisible = false
    },
    // 添加账单
    addBill(){
      this.dialogVisible = true
    },
    handleClose(){
      this.dialogVisible = false
    },
    // 表头样式
    getRowClass ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#1FB19E;color:#ffffff;text-align:center;font-size:9px;font-weight:500;'
      } else {
        return ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .demo-ruleForm{
    /* width: 515px; */
    margin: auto;
    /* margin-top: 60px; */
  }
  .contentTable{
    width: 80%;
    margin: auto;
  }
  .el-button--primary:focus, .el-button--primary:hover{
    background-color: #1fb19e;
    border-color: #1fb19e;
  }
  .addBtn{
    background-color: rgb(31, 177, 158);;
    border: rgb(31, 177, 158);;
    float:right;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
  }
  .el-table__body tr,
    .el-table__body td {
      padding: 0;
      height: 30px;
  }
</style>
