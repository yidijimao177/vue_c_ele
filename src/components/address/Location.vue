<template>
  <div class="location">
    <div class="title">当前定位</div>
    <div class="des" @click="$emit('click')">
      <van-icon name="flag-o" />
      <span>{{ address }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {},

  props: {
    address: String,
  },
};
</script>
<style lang="scss" scoped>
.location {
  padding-left: 15px;
  .title {
    font-weight: 600;
  }
  .des {
    i {
      color: #009eef;
      font-size: 18px;
    }
    span {
      color: #333;
      font-weight: bold;
      margin-left: 5px;
      display: inline-block;
      width: 90%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
