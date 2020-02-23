<template>
  <div>
    <p>使用组件marquee</p>
    <zty-marquee :data="list"></zty-marquee>
    <div class="box"></div>
    <Picture :data="tempData" :resolver="dataResolver" class="img"></Picture>
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
// import Picture from "./Picture";
// console.log("Picture =", Picture);
export default {
  name: "use-zty-comp",
  components: {
    // Picture
  },
  data() {
    return {
      list: [
        "奕朵妈妈 成功推荐18人",
        "暖夏 成功推荐8人",
        "天天麻麻 成功推荐14人",
        "恭喜“嘟嘟妈妈”抽中20元品尝装",
        "恭喜“小公主佩奇”抽中109元护肤油",
        "恭喜“小妮妮麻麻”抽中88元优惠券"
      ],
      tempData: {
        width: 300,
        height: 400,
        src: require("../assets/img/340_400.jpg")
      }
    };
  },
  mounted() {},
  methods: {
    dataResolver(data) {
      data.name = "hh";
      return data;
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  margin: 20px auto;
  width: 100%;
  height: 20px;
}
</style>
