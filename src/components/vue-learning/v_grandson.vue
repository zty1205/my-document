<template>
  <div class="box">
    <h2>孙子组件</h2>
    <el-button type="primary" @click="doMsg">发送消息</el-button>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    doMsg() {
      this.$emit("acceptMsg", "这是来自孙子组件的消息");
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid red;
  margin: 10px;
  padding: 10px;
}
</style>
