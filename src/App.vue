<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      const self = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          //---------------------------
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB",
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);
        //成功则进入精准定位
        function onComplete(data) {
          // data是具体的定位信息
          // console.log(data); formattedAddress
          self.$store.dispatch("posi/setLocation", [data]);
          self.$store.dispatch("posi/setAddress", [data.formattedAddress]);
          // console.log(data);
        }
        //失败则进入非精准定位
        function onError(data) {
          // 定位出错
          self.getLngLatLocation();
        }
      });
    },
    getLngLatLocation() {
      const self = this;
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            // console.log(result);
            AMap.plugin("AMap.Geocoder", function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode,
              });

              var lnglat = result.rectangle.split(";")[0].split(",");

              geocoder.getAddress(lnglat, function(status, data) {
                if (status === "complete" && data.info === "OK") {
                  // data为对应的地理位置详细信息
                  console.log(data);
                  const obj = {
                    addressComponent: {
                      city: result.city,
                      province: result.province,
                    },
                    formattedAddress: data.regeocode.formattedAddress,
                  };
                  self.$store.dispatch("posi/setLocation", [obj]);
                  self.$store.dispatch("posi/setAddress", [
                    data.regeocode.formattedAddress,
                  ]);
                }
              });
            });
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
@import "../public/css/_style.css";
#app {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background-color: #f1f1f1;
}
</style>
