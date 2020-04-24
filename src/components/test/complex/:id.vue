<template>
  <div>
    complex
  </div>
</template>

<script>
export default {
  name: 'complex',
  created() {
    console.log('complex')
  },
  mounted() {
    console.log('complex this = ', this)
    console.log('router this = ', this.$router)
    console.log('route this = ', this.$route)
  }
}
</script>

<style>

</style>