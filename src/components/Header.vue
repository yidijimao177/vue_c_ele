<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="$emit('onClickLeft')"
  />
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {},
  props: {
    title: String,
    isLeft: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.van-nav-bar {
  background: #009eef;
  /deep/ .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__text {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
}
</style>
