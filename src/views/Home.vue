<template>
  <div class="container">
    <!-- 导航菜单栏 -->
    <nav-bar/>
    <!-- 头部区域 -->
    <header-bar/>
    <!-- 主内容区域 -->
    <main-content/>
  </div>
</template>

<script>
import NavBar from './NavBar/NavBar'
import HeaderBar from './HeaderBar/HeaderBar'
import MainContent from './MainContent/MainContent'
export default {
  name: 'Home',
  components: {
    HeaderBar,
    NavBar,
    MainContent
  }
}
</script>

<style scoped lang="scss">
  .container {
    position:absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
</style>
