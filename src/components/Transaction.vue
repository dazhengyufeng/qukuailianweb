<template>
<div id="transaction">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" size="mini" label-width="100px" class="demo-ruleForm">
    <el-form-item label="发送方" prop="sender">
      <el-input v-model="ruleForm.sender"></el-input>
    </el-form-item>
    <el-form-item label="接收方" prop="recipient">
      <el-input v-model="ruleForm.recipient"></el-input>
    </el-form-item>
    <el-form-item label="金额" prop="amount">
      <el-input v-model.number="ruleForm.amount"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import api from '../assets/js/api'

  export default {
    data() {
      return {
        ruleForm: {
          sender: '', // 发送方
          recipient: '', // 接收方
          amount: '' // 总数
        },
        rules: {
          sender: [
            { required: true, message: '请填写发送方姓名', trigger: 'blur' }
          ],
          recipient: [
            { required: true, message: '请填写接收方姓名', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '请填写金额', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              senderId:localStorage.getItem('userId'), // 发送人id
              sender:this.ruleForm.sender, // 发送人
              recipient:this.ruleForm.recipient, // 接收人
              amount:this.ruleForm.amount // 总数
            }
            // 交易
            api.transaction(data).then(res => {
              console.log(res)
              this.$message({
                message: '恭喜你，交易成功',
                type: 'success'
              });
              // 重置表单
              this.resetForm('ruleForm')
            }).catch(err => {
              console.log(err,'错误')
              this.$message.error("");
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss">
#transaction{
  width: 600px;
  margin: auto;
  padding: 100px 50px;
  border: 1px solid;
  margin-top: 100px;
}
</style>
