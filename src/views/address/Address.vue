<template>
  <div class="address">
    <Header
      @onClickLeft="$router.push({ path: '/home' })"
      title="选择收货地址"
    />
    <div class="city_search">
      <div class="search">
        <span class="city" @click="$router.push({ path: '/city' })">
          <span>{{ city || "狗窝" }}</span>
          <van-icon class="plays" name="play" />
        </span>
        <van-icon name="search" class="search_icon" />
        <input
          type="text"
          v-model="search_val"
          placeholder="小区/写字楼/学校等"
        />
      </div>
      <Location @click="seleteAddress" :address="address" />
    </div>
    <div class="area" v-if="areaList">
      <ul class="area_list" v-for="(item, index) in areaList" :key="index">
        <li @click="seleteAddress(item)">
          <h4>{{ item.name }}</h4>
          <p>{{ item.district }}{{ item.address }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Header from "../../components/Header";
import Location from "@/components/address/Location";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "add_ress",
  data() {
    return {
      city: "", //当前城市
      search_val: "",
      areaList: "",
    };
  },
  computed: {
    ...mapGetters("posi", {
      address: "address",
    }),
  },
  methods: {
    // ...mapActions("posi", {
    //   seleteAddress: "SET_ADDRESS",
    // }),
    seleteAddress(item) {
      if (item) {
        //将搜索到地址，点击设置给home首页的最上面
        this.$store.dispatch("posi/setAddress", [
          `${item.district}${item.address}${item.name}`,
        ]);
      } else {
        this.$store.dispatch("posi/setAddress", this.address);
        console.log(this.address);
      }

      //跳转到home
      this.$router.push({ path: "/home" });
    },
    searchPlace() {
      const self = this;
      //   console.log(self.search_val);
      AMap.plugin("AMap.Autocomplete", function() {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city,
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.search_val, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result.tips);
          self.areaList = result.tips;
        });
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to);
    console.log(to.params.city);
    next((vm) => {
      vm.city = to.params.city;
    });
  },
  watch: {
    search_val() {
      this.searchPlace();
    },
  },
  components: {
    Header,
    Location,
  },
};
</script>
<style lang="scss" scoped>
.address {
  background-color: #fff;
  .city_search {
    padding-bottom: 5px;
    .search {
      margin: 10px 15px;
      box-sizing: border-box;
      border-radius: 10px;
      background-color: #f1f1f1;
      line-height: 40px;
      .city {
        box-sizing: border-box;
        position: relative;

        &::after {
          content: "";
          display: inline-block;
          width: 1px;
          height: 20px;
          background-color: black;
          position: absolute;
          bottom: 0px;
          border-radius: 1px;
        }
        span {
          box-sizing: border-box;
          padding: 0 5px 0 5px;
          display: inline-flex;
          text-align: center;
          width: 45px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .plays {
          transform: rotate(90deg) translate(8px, 0px);
          padding: 0 10px 0 0px;
          box-sizing: border-box;
          color: #aaa;
        }
      }
      .search_icon {
        margin: 0 5px 0 10px;
        color: #aaa;
      }
      input {
        border: none;
        background-color: #f1f1f1;
        width: 220px;

        &::-webkit-input-placeholder {
          color: #aaa;
        }
      }
    }
  }
  .area {
    .area_list {
      padding-left: 3px;
      li {
        border-bottom: 1px #eee solid;
        padding: 3px 5px 0;
        p {
          color: #aaa;
        }
      }
    }
  }
}
</style>
