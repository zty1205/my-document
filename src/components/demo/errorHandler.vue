<template>
  <div></div>
</template>

<script>
export default {
  name: "errorHander",
  data() {
    return {

    }
  },
  mounted() {
    // config.errorHandler可以捕捉
    // a
    // throw new Error('It is error!')
    // let a = undefined
    // console.log(a.b)
    JSON.parse('[')
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>