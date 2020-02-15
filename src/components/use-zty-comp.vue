<template>
  <div>
    <p>使用组件marquee</p>
    <zty-marquee :data="list"></zty-marquee>
  </div>
</template>

<script>
function setRem(pageSize) {
  const wWidth =
    window.innerWidth ||
    document.body.clientWidth ||
    document.documentElement.clientWidth;
  document.getElementsByTagName("html")[0].style.fontSize =
    (wWidth / pageSize) * 100 + "px";
}
setRem(750);
export default {
  name: "use-zty-comp",
  data() {
    return {
      list: [
        "奕朵妈妈 成功推荐18人",
        "暖夏 成功推荐8人",
        "天天麻麻 成功推荐14人",
        "恭喜“嘟嘟妈妈”抽中20元品尝装",
        "恭喜“小公主佩奇”抽中109元护肤油",
        "恭喜“小妮妮麻麻”抽中88元优惠券"
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
