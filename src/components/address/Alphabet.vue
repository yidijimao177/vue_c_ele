<template>
  <div class="alphabet" ref="area_scroll">
    <div class="scroll_wrap">
      <!-- 热门城市 -->
      <div class="hot_wrap cityList">
        <div class="title">热门城市</div>
        <ul class="hot_city" v-if="cityInfo">
          <li
            @click="$emit('selectCity', item)"
            v-for="(item, index) in cityInfo.hotCities"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 所有城市 -->
      <div class="city_wrap ">
        <!-- 循环排序好的字母 -->
        <div
          class="content cityList"
          v-for="(item, index) in keys"
          :key="index"
        >
          <div class="title">{{ item }}</div>
          <!-- 根据字母展示城市，注意看，每一个字母都是键，每一个城市都是值，一个字母键，对应多个城市值 -->
          <ul class="all_city">
            <li
              @click="$emit('selectCity', city)"
              v-for="(city, index) in cityInfo[item]"
              :key="index"
            >
              {{ city.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="area_keys">
      <ul>
        <li @click="selectKey(0)">#</li>
        <li
          @click="selectKey(index + 1)"
          v-for="(item, index) in keys"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
// var BScroll = require("@better-scroll/scroll");
export default {
  name: "alphabet",
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    initBScroll() {
      this.scroll = new BScroll(this.$refs.area_scroll, {
        click: true,
      });
    },
    //点击右侧字母滚动到相应位置
    selectKey(index) {
      // console.log(index);
      /*
        index获取所有右侧字母的索引，
        cityList，获取相应的城市位置
      */
      const cityList = this.$refs.area_scroll.querySelectorAll(".cityList");
      // console.log(cityList);
      //根据下标，滚动到对象的元素上
      let el = cityList[index];

      //使用BScroll插件的scrollToElement方法 滚动到对应的位置上
      this.scroll.scrollToElement(el, 250);
    },
  },
  mounted() {
    // this.initBScroll();
  },
  props: {
    cityInfo: Object,
    keys: Array,
  },
};
</script>
<style lang="scss" scoped>
.alphabet {
  margin-top: 10px;
  // margin-bottom: 140px;
  background-color: #fff;
  box-sizing: border-box;
  padding-top: 10px;
  height: calc(100% - 100px);
  overflow: hidden;
  .scroll_wrap {
    // overflow: auto;
    .hot_wrap {
      margin-bottom: 5px;
      .title {
        font-size: 16px;
        color: #aaa;
      }
      .hot_city {
        display: flex;
        flex-wrap: wrap;
        padding-left: 10px;
        padding-right: 100px;
        li {
          width: 100px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background-color: #eee;
          margin: 5px;
          border-radius: 5px;
          color: #333;
        }
      }
    }
    .city_wrap {
      height: 100%;
      .content {
        margin-left: 5px;
        // height: 100%;
        .all_city {
          height: 100%;
          li {
            padding: 10px;
            border-bottom: 1px solid #eee;
            // height: 100%;
          }
        }
      }
    }
  }
  .area_keys {
    position: fixed;
    top: 25%;
    right: 0;
    color: #aaa;
    font-size: 12px;
    padding: 5px 5px 0 0;
    text-align: center;
  }
}
</style>
