<!--
 * @Date: 2019-08-20 16:17:09
 * @information: 最新更改时间
 -->
<template>
  <div class="login-container">
    <div class="sign">
      <span class="title">注册账号</span>
      <div class="sign-form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 用户名 -->
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="againPassword">
            <el-input v-model="ruleForm.againPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import code from "../../utils/code";
// import signApi from "../../api/signApi";

export default {
  data() {
    // 自定义手机号验证
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    // 自定义验证码验证
    const validateCode = (rule, value, callback) => {
      let res = this.verifyCode.validate(value);
      if (res) {
        callback();
      } else {
        callback(new Error("验证码错误"));
      }
    };
    // 自定义密码验证
    var password = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 自定义确认密码验证
    var againPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      verifyCode: null,
      ruleForm: {
        code: "", // 验证码
        userName: "", // 用户名
        phone: "", // 手机号
        teamName: "", // 团队编码
        password: "", // 密码
        againPassword: "" // 确认密码
      },
      // 验证规则
      rules: {
        code: [{ required: true, trigger: "blur", validator: validateCode }],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", validator: checkPhone }
        ],
        teamName: [
          { required: true, message: "请输入团队编码", trigger: "blur" }
        ],
        password: [{ required: true, trigger: "blur", validator: password }],
        againPassword: [
          { required: true, trigger: "blur", validator: againPassword }
        ]
      }
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let val = {
            password: this.ruleForm.password,
            phone: this.ruleForm.phone,
            teamCoding: this.ruleForm.teamName,
            userName: this.ruleForm.userName
          };
          // 注册
          signApi.signIn(val).then(res => {
            this.$message({
              message: "账号注册成功",
              type: "success"
            });
            // 跳转到登录页
            this.$router.push({ path: "/login" });
          });
        } else {
          this.$message.error("账号注册失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    // this.verifyCode = new GVerify("v_container");
  }
};
</script>

<style lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  padding-top: 30px;
  background-image: url('http://5b0988e595225.cdn.sohucs.com/images/20190917/1ce7482c60a44609846f63638b280151.jpeg');
  background-size: 100%;
  .el-input__inner{
    border: 1px solid #DCDFE6 !important;
  }
  .title{
    margin-top: 12px;
    text-align: center;
    color: #7c7c7c;
    width: 100%;
    display: block;
  }
  .sign{
    padding-top: 25px;
    box-sizing: border-box;
    width: 580px;
    height: 520px;
    margin-left: 170px;
    // margin-top: 30px;
    background: #fff;
    box-shadow: 0 5px 12px 0 rgba(179,185,207,.5);
    border-radius: 10px;
  }
  .sign-form{
    padding-top: 64px;
    width: 519px;
    height: 549;
  }
  .el-form-item__label{
    text-align: left;
  }
  .el-form-item{
    padding: 0 20px;
    width: 100%;
  }
  .el-button--primary{
    width: 387px;
    height: 32px;
    line-height: 0px;
  }
  .el-form-item__content{
    display: flex;
  }
}
</style>

