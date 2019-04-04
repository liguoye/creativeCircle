<template>
  <div id="app">
    <header-com></header-com>
    <nav-bar></nav-bar>
    <on-line-com></on-line-com>
    <router-view />
  </div>
</template>

<script>
import headerCom from '@/components/headerCom.vue'
import navBar from '@/components/navBar.vue'
import onLineCom from '@/components/onLineCom.vue'
export default {
  name: 'App',
  components: {
    headerCom,
    onLineCom,
    navBar
  }
}
</script>

<style lang="less">
@import "./styles/index.less";
</style>
