<template>
  <div id="wallet">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的BTC钱包</span>
        <span>钱包余额：{{count}}BTC</span>
      </div>
      <div v-for="(item,key) in list" :key="key" class="text item">
        <div>发送人：{{item.sender}}</div>   <div>接收人：{{item.recipient}}</div>   <div>交易金额：{{item.amount}}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import api from '../assets/js/api'

  export default {
    data() {
      return {
        count:30,
        list:[]
      };
    },
    mounted(){
      // 获取我的钱包详情
      this.getMyWallet()
    },
    methods: {
      // 获取我的钱包数据
      getMyWallet(){
        // 查询条件
        let data = { senderId:localStorage.getItem('userId') }
        // 获取我的钱包详情
        api.myWallet(data).then(res => {
          console.log(res)
          let { count,list } = res.data.result
          console.log(count,list,'=====')
          this.count = count
          this.list = list
        }).catch(err => {

        })
      }
    }
  }
</script>

<style lang="scss">
  .text {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: auto;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix{
    display: flex;
    justify-content:space-between
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 600px;
    height: 500px;
    margin: 40px auto;
  }
</style>
