<template>
  <div id="wallet">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的BTC钱包</span>
        <span>钱包余额：{{num}}BTC</span>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num:30
      };
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  .text {
    font-size: 14px;
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
