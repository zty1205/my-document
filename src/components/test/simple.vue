<template>
  <div>
    simple
  </div>
</template>

<script>
export default {
  name: 'simple',
  dynamicVuex: true,
  created() {
    console.log('simple')
  },
  mounted() {
    console.log('simple this = ', this)
    console.log('simple this.$store = ', this.$store)
  }
}
</script>

<style>

</style>