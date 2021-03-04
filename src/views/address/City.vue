<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <van-icon name="search" />
        <input type="text" v-model="city_val" placeholder="输入城市名" />
      </div>
      <button @click="aa">
        取消
      </button>
    </div>
    <div style="height:100%;overflow: hidden;" v-if="serachList.length == 0">
      <div class="location">
        <Location :address="city" @click="selectCity({ name: city })" />
      </div>

      <Alphabet
        @selectCity="selectCity"
        ref="allcity"
        :cityInfo="cityInfo"
        :keys="keys"
      />
    </div>
    <div class="search_list" v-else>
      <ul>
        <li
          @click="selectCity(item)"
          v-for="(item, index) in serachList"
          :key="index"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Location from "@/components/address/Location";
import { mapGetters, mapActions } from "vuex";
import { cityGetCityInfo } from "@/api/city.js";
import Alphabet from "@/components/address/Alphabet";
export default {
  name: "",
  data() {
    return {
      city_val: "",
      keys: [],
      cityInfo: {},
      allCities: [], //用来接收所有城市
      serachList: [],
    };
  },
  watch: {
    city_val() {
      // console.log(this.city_val);
      this.serachCity();
    },
  },
  computed: {
    citys() {
      return this.$store.getters["posi/city"];
    },
  },
  methods: {
    aa() {
      this.$router.push({ name: "address", params: { city: this.citys } });
    },
    getCityInfo() {
      cityGetCityInfo()
        .then((res) => {
          // console.log(res);
          this.cityInfo = res.data;
          //处理key，计算key
          this.keys = Object.keys(res.data);
          //   console.log(this.keys);
          //移除 hotcities这个key
          this.keys.pop();
          //key排序
          this.keys.sort();
          //   console.log(this.keys);
          //最后调用子组件的initBScroll方法，因为必须要在数据加载完在调用，给子组件加了$refs.allcity用来调用子组件的initBScroll()方法
          this.$nextTick(() => {
            this.$refs.allcity.initBScroll();
          });
          /*
            功能：存储所有城市进来，用来搜索过滤
            1.遍历所有字母
            2.每一个字母下面都有多个城市，通过字母遍历所有城市

          */
          this.keys.forEach((key) => {
            // console.log(key);
            this.cityInfo[key].forEach((city) => {
              // console.log(city);
              this.allCities.push(city);
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectCity(city) {
      // console.log(city);
      this.$router.push({ name: "address", params: { city: city.name } });
      this.$store.dispatch("posi/citycunchu", city.name);
      // console.log(city.name);
    },
    //搜索框里的方法
    serachCity() {
      //1.判断搜索框是否为空，为空则serachList依然为空
      if (!this.city_val) {
        this.serachList = [];
      } else {
        //2.this.allCities存入了所有城市
        //3.根据输入框的关键字检索城市，然后存入到serachList数组中
        this.serachList = this.allCities.filter((item) => {
          return item.name.indexOf(this.city_val) != -1;
        });
        // console.log(this.serachList);
      }
    },
  },
  computed: {
    city() {
      this.$store.getters["posi/location.addressComponent.city"] ||
        this.$store.getters["posi/location.addressComponent.province"];
    },
  },
  components: {
    Location,
    Alphabet,
  },
  created() {
    this.getCityInfo();
  },
};
</script>
<style lang="scss" scoped>
.city {
  width: 100%;
  height: 100%;
  .search_wrap {
    display: flex;
    justify-content: space-between;
    padding: 2px 15px 10px 10px;
    background-color: #fff;
    .search {
      background-color: #f1f1f1;
      padding: 10px;
      width: 85%;
      border-radius: 10px;
      .van-icon {
        margin-right: 8px;
      }
      input {
        background-color: #f1f1f1;
        border: none;
        &::-webkit-input-placeholder {
          font-size: 10px;
          color: #333;
        }
      }
    }
    button {
      background-color: #fff;
      color: #009eef;
    }
  }
  .location {
    background-color: #fff;
  }
  .search_list {
    position: fixed;
    top: 42.5px;
    background-color: #eee;
    left: 0;
    right: 0;
    bottom: 0;
    ul {
      background-color: #fff;
      li {
        border-bottom: 1px solid #eee;
        padding: 10px 0 2px 10px;
      }
    }
  }
}
</style>
