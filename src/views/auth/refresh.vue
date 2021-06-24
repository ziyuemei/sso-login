<template>
  <div>
    <!-- 弹窗 -->
    <div v-show="visiabe">
      <!--这里是要展示的内容层-->
      <div class="content">
        <span v-html="message"></span>
      </div>
      <!--半透明背景层-->
      <div class="over"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visiabe: true,
      message: "请稍等，正在重新进行身份认证......",
      redirectURL: null
    };
  },
  created() {
    this.redirectURL = this.$route.query.redirectURL || "/";
    this.refreshLogin();
  },
  methods: {
    refreshLogin() {
      this.$store
        .dispatch("SendRefreshToken")
        .then(() => {
          this.message = "令牌已刷新";
          window.location.href = this.redirectURL;
        })
        .catch(err => {
          this.message = `您的身份已过期，请点击<a href="/?redirectURL=${this.redirectURL}">重新登录</a>`;
        });
    }
  }
};
</script>

<style scoped>
@import "../../assets/style/refresh.css";
</style>
