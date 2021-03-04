<template>
  <van-tabbar class="tabbar" active-color="#009eef" route>
    <van-tabbar-item
      :icon="item.icon"
      v-for="(item, index) in data"
      :key="index"
      :to="item.path"
      >{{ item.title }}</van-tabbar-item
    >
  </van-tabbar>
</template>
<script>
export default {
  name: "tabbar",
  data() {
    return {};
  },
  methods: {},
  props: {
    data: Array,
  },
};
</script>
<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 50px !important;
  box-sizing: border-box;
  //   padding-bottom: 5px;
}
</style>
