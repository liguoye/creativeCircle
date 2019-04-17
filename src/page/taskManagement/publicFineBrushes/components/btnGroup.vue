<template>
  <div class="btnGroup">
    <p :class="showBackBtn=='1'?'disabled':''" @click="btnClick('back')">上一步</p>
    <p :class="showGoBtn=='1'?'disabled':''"  @click="btnClick('go')">下一步</p>
  </div>
</template>
<script>
export default {
  props: {
    showBackBtn: {
    },
    showGoBtn: {
      type: String,
      default:'1'
    }
  },
  methods: {
    btnClick (val) {
      this.$emit('btnClick', val)
    }
  }
}

</script>
<style lang="less" scoped>
.btnGroup {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  p {
    width: 250px;
    display: inline-block;
    cursor: pointer;
    height: 45px;
    margin: 0 auto;
    text-align: center;
    line-height: 45px;
    color: #fff;
    background: #0099e5;
    border-radius: 25px;
    font-size: 16px;
    &:first-child {
      margin-right: 20px;
    }
  }
  .disabled {
    cursor: default;
    background-color: #ddd !important;
  }
}
</style>
