<template>
  <div class="index">
    <Tabbar :data="tabbarData" />
    <router-view></router-view>
  </div>
</template>
<script>
import Tabbar from "@/components/Tabbar";
export default {
  name: "index",
  data() {
    return {
      tabbarData: [
        { title: "首页", icon: "wap-home-o", path: "/home" },
        { title: "订单", icon: "orders-o", path: "/order" },
        { title: "我的", icon: "user-circle-o", path: "/me" },
      ],
    };
  },
  methods: {},
  components: {
    Tabbar,
  },
};
</script>
<style lang="scss" scoped>
.index {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
