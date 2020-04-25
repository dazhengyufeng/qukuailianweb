<!--
 * @Date: 2019-08-20 16:17:09
 * @information: 最新更改时间
 -->
<template>
  <div class="login">
    <div class="login-content">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">区块链系统登录</h3>
        </div>
        <el-form-item prop="phone">
          <!-- <span class="svg-container"> -->
          <!-- </span> -->
          <el-input
            ref="phone"
            v-model="loginForm.phone"
            placeholder="请输入账号"
            name="phone"
            type="text"
            tabindex="1"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item prop="password">
          <!-- <span class="svg-container"> -->
          <!-- </span> -->
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <!-- <span class="show-pwd" @click="showPwd">
          </span> -->
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin('loginForm')"
        >登录</el-button>
        <div class="tips">
          <span style="margin-right:20px;cursor:pointer;" @click="signInId">去注册</span>
          <!-- <span style="margin-right:20px;cursor:pointer;" @click="forget">忘记密码</span> -->
        </div>
      </el-form>
    </div>
  </div>
</template>

// <script>
// import api from "../../api/user";
// import roleTable from "../../router/roleRouterTable";
// import { router, resetRouter } from "../../router/index";
// import roleMap from "../../router/routerMap";
// import Router from "vue-router";
import api from '../assets/js/api'

export default {
  data() {
    // 账号自定义验证
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    // 密码自定义验证
    const validatePassword = (rule, value, callback) => {
      if (value.length > 15) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      // 表单信息
      loginForm: {
        phone: "",
        password: ""
      },
      loginRules: {
        phone: [
          { required: true, trigger: "change", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "change", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @author: zyf
     * @information: 点击登陆
     * @Date: 2019-08-21 10:04:25
     */
    handleLogin(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          let val = {
            password: this.loginForm.password,
            userName: this.loginForm.phone
          };
          // 登录
          api.login(val).then(res => {
            if(res.data.statusCode == 43001){
              this.$message.error("用户名密码错误");
              return
            }
            localStorage.setItem('userId',res.data.result.id)
            this.$router.push({path:'/content/blogTable'})
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 跳转到注册页
    signInId() {
      this.$router.push({ path: "/signIn" });
    },
    // 忘记密码
    forget() {
      this.$router.push({ path: "/forget" });
    }
  }
};
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

.login-content {
  width: 600px;
  height: 500px;
  margin: 100px auto;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  box-shadow: 0 5px 12px 0 rgba(179, 185, 207, 0.5);
  border-radius: 10px;
}

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login {
  display: flex;
  align-items: center;
  .el-input {
    display: inline-block;
    height: 47px;
    line-height: 52px;
    width: 100%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
}

$bg: rgb(247, 247, 247);
$dark_gray: #889aa4;
$light_gray: #eee;

.el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  // background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
}
.login {
  background-image: url("https://img.alicdn.com/tfs/TB1cpTewMHqK1RjSZFEXXcGMXXa-2872-1580.png");
  background-size: 100%;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 0px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .el-input .el-input__inner {
      background-color: #2d3a4b !important;
      border: 0px;
    }
  }

  .tips {
    font-size: 14px;
    // color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      // color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 45px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
