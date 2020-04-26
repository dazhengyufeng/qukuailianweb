<template>
  <div class="content">

    <!-- 导航 -->
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
        <el-menu-item index="1">区块列表</el-menu-item>
        <el-menu-item index="2">我的钱包</el-menu-item>
        <el-menu-item index="3">交易</el-menu-item>
      </el-menu>
    </div>
    <router-view/>

  </div>
</template>

<script>
import axios from '../assets/js/axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      activeIndex:'1',
      lastIndex:'1'
    }
  },
  methods:{
    // 选择
    handleSelect(data){
      if(data == this.lastIndex){
        return
      }
      this.lastIndex = data
      switch(parseInt(data)){
        case 1:
          this.$router.push({ path:'/content/blogTable' })
          break;
        case 2:
          this.$router.push({ path:'/content/wallet' })
          break;
        case 3:
          this.$router.push({ path:'/content/transaction' })
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-menu-demo {
  padding-left: 200px;
}
.content{
  width: 100%;
  height: 80%;
}
</style>
