<template>
  <div>
    菜单管理
    <el-button type="primary" @click="geback">点击</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    geback() {
      // sessionStorage.removeItem('user')
      this.$router.push(`/sys/dept/${123}`)
    }
  }
}
</script>

<style>
</style>
