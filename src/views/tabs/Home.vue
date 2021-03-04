<template>
  <div class="home">
    <div class="header">
      <div
        class="address_map"
        @click="$router.push({ name: 'address', params: { city: city } })"
      >
        <van-icon name="location" />

        <span>{{ address }}</span>

        <van-icon class="plays" name="play" />
      </div>
    </div>
    <div class="shop_search">
      <div class="search">
        <van-icon name="search" />
        搜索商家 商家名称
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("posi", {
      address: "address",
    }),
    city() {
      this.$store.getters["posi/location.addressComponent.city"] ||
        this.$store.getters["posi/location.addressComponent.province"];
    },
  },
  components: {},
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  .header {
    background-color: #009eef;
    color: #fff;
    width: 100%;
    .address_map {
      padding: 15px 10px;
      .van-icon {
        font-size: 12px;
        margin-right: 5px;
        // transform: translate(0px, -18px);
      }
      span {
        display: inline-block;
        font-size: 14px;
        //下面4个属性都需要,才可以出现...
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .plays {
        transform: rotate(90deg);
        //translate(0px, -18px)
      }
    }
  }
  .shop_search {
    background-color: #009eef;
    height: 50px;
    padding: 0 10px;
    .search {
      background: #fff;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #aaa;
      border-radius: 5px;
      .van-icon {
        font-size: 16px;
        box-sizing: border-box;
        margin: 0 5px;
        transform: translate(5px, 3px);
      }
    }
  }
}
</style>
