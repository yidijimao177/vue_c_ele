<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/logo.jpg" alt="" />
    </div>
    <InputGroup
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnclick="getVerifyCode"
    />
    <InputGroup
      type="number"
      v-model="verifyCode"
      placeholder="验证码"
      :error="errors.code"
    />

    <div class="login_des">
      <p>
        新用户登录登录即自动注册
        <span>《用户服务协议》</span>
      </p>
    </div>

    <!-- 登录按钮 -->
    <div class="login_btn">
      <button
        class="border-radius"
        :class="{ btn_if: isClick }"
        :disabled="isClick"
        @click="handleLogin"
      >
        登录
      </button>
    </div>
  </div>
</template>
<script>
import InputGroup from "../components/login/InputGroup";
import { getVerificationCode, verification } from "../api/login";
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      phone: "",
      verifyCode: "",
      errors: {},
      btnTitle: "获取验证码",
      disabled: false,
    };
  },
  computed: {
    /*
        判断登录按钮是否可以点击
        1.在computed自动计算,自动进行判断，为真则不能点击，为假则可以点击
        2.如果 手机号为空 返回真,或者验证码为空 也返回真,不能点击登录按钮
        3.如果两个都有值，则返回 false，可以点击登录按钮
      */
    isClick() {
      if (!this.phone || !this.verifyCode) return true;
      else return false;
    },
  },
  methods: {
    //登录按钮
    handleLogin() {
      //1.取消错误提醒
      this.errors = {};
      //2.发送请求，验证手机号和验证码
      const obj = {
        phone: this.phone,
        code: this.verifyCode,
      };
      verification(obj)
        .then((res) => {
          console.log(res);
          //3.校验成功,则设置登录状态 储存起来,并且跳转到首页
          window.localStorage.setItem("ele_login", true);
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          //4.校验不成功,返回错误信息,把错误信息渲染出去
          this.errors = {
            code: err.response.data.msg,
          };
        });
    },
    getVerifyCode() {
      //   console.log(this.phone);
      if (this.validatePhone()) {
        this.validateBtn();
        // axios
        //   .post("/api/posts/sms_send", {
        //     // sid:'',
        //     // token:'',
        //     // appid:'',
        //     // templateid:'',
        //     phone: this.phone,
        //   })
        //   .then((res) => {
        //     console.log(res);
        //     this.validateBtn();
        //   });
        const obj = {
          // sid:'',
          // token:'',
          // appid:'',
          // templateid:'',
          phone: this.phone,
        };
        getVerificationCode(obj).then((res) => {
          console.log(res);
        });
      }
    },
    //获取验证码方法
    validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          //倒计时
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    },
    validatePhone() {
      /*
            验证手机号码
            1.不能为空
            2.手机号码是否输入正确
        */
      if (!this.phone) {
        this.errors = {
          phone: "手机号码不能为空",
        };
        return false;
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: "请填写正确的手机号码",
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
    },
  },
  components: {
    InputGroup,
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/pulic-class.scss";
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;
  .logo {
    text-align: center;
    img {
      width: 150px;
    }
  }
  .login_des {
    text-align: left;
    color: black;
    span {
      color: #4d90fe;
    }
  }
  .login_btn {
    button {
      color: #fff;
      font-size: 14px;
      background-color: #48ca38;
      width: 100%;
      height: 35px;
    }
    .btn_if {
      background-color: #8bda81;
    }
  }
  .logo,
  .text_group,
  .login_des,
  .login_btn {
    margin-bottom: 30px;
  }
}
</style>
