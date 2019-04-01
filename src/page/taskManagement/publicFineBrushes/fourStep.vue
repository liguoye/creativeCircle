<template>
  <div class="fourStep">

    <btn-group :btn-active="btnActive" @btnClick="btnClick"></btn-group>
  </div>
</template>
<script>
import btnGroup from './components/btnGroup.vue'
export default {
  components: {
    btnGroup
  },
  data () {
    return {
      radio: '1',
      btnActive: 0
    }
  },
  methods: {
    btnClick (val) {
      if (val === 'back') {
        this.$emit('changeState', { state: 'thirdStep' })
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
