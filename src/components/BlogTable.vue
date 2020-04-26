<template>
  <div class="contentTable" v-loading="loading" element-loading-text="正在拼了老命的挖矿中，请稍等"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 按钮 -->
    <el-button type="primary" @click="mining" size='small' class="addBtn">开始挖矿</el-button>

    <!-- 表格 -->
    <div class="table">
      <el-table
        ref="singleTable"
        :data="tableData"
        border
        :header-cell-style="getRowClass"
        highlight-current-row
        style="width: 100%">

        <!-- 索引 -->
        <el-table-column
          property="index"
          label="索引"
          width="50">
        </el-table-column>

        <!-- 上个区块的时间戳 -->
        <el-table-column
          property="previousHash"
          label="上个区块的hash">
        </el-table-column>

        <!-- 时间戳 -->
        <el-table-column
          property="timestamp"
          label="时间戳">
        </el-table-column>

        <!-- 内容 -->
        <el-table-column
          property="hash"
          label="本区块的hash">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from '../assets/js/api'

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
      loading:false
    }
  },
  mounted(){
    // 获取区块链列表
    this.selectTable()
  },
  methods:{
    // 获取区块链
    selectTable(){
      // 获取区块链
      api.getBlockList().then(res => {
        console.log(res)
        this.tableData = res.data.result
      })
    },
    // 挖矿
    mining(){
      this.loading = true
      // 发送人id
      let data = { userId: localStorage.getItem('userId') }
      // 挖矿
      api.mining(data).then(res => {
        let { count,nonce } = res.data.result
        this.$notify({
          title: '提示',
          message: `恭喜你通过${nonce}次挖矿，获得一个新的区块，并得到${count}BTC的奖励`,
          duration: 0
        });
        this.selectTable()
        this.loading = false
      })
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
    height: 100%;
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
