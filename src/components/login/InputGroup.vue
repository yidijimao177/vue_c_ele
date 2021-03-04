<template>
  <div class="text_group">
    <div class="input_group border-radius" :class="{ disa_bled: error }">
      <!-- 输入框 -->
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :name="name"
        @input="$emit('input', $event.target.value)"
        class="border-radius"
      />

      <!-- 输入框后面的按钮 -->
      <button
        :class="{ 'is-color': disabled }"
        v-if="btnTitle"
        :disabled="disabled"
        @click="$emit('btnclick')"
      >
        {{ btnTitle }}
      </button>
    </div>
    <!-- 错误提示 -->
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>
<script>
export default {
  name: "inputGroup",
  data() {
    return { name: "" };
  },
  methods: {},
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: String,
    placeholder: String,
    btnTitle: String,
    disabled: Boolean,
    error: String,
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/pulic-class.scss";
.text_group {
  .input_group {
    border: 1px solid #ccc;
    height: 35px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 0px 10px 1px #ccc;

    input {
      border: none;
      padding-left: 15px;
    }
    input::-webkit-input-placeholder {
      color: #ccc;
      font-size: 12px;
    }
    button {
      padding-right: 15px;
      background-color: $baise;
      color: black;
      padding-left: 10px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .is-color {
      color: #999;
      background-color: #eee;
    }
  }
  .invalid-feedback {
    color: red;
    text-align: left;
  }
  .disa_bled {
    border: 1px solid red;
    font-size: 10px;
  }
}
</style>
