<template>
  <div class="notice" v-if="detail">
    <div class="title">{{detail.title}}</div>
    <div class="content" v-html="detail.text"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: null
    };
  },
  created(){
      this.getHome()
  },
  methods: {
    getHome() {
        let id=this.$route.params.id
       // console.log(id)
      this.$ajax.get("login/noticeList").then(res => {
        if (res && res.data && res.data.code == 1) {
       //   console.log(res)
          let data=res.data.data
          data.forEach(item => {
              if(item.id==id){
                  this.detail=item
              }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.notice{
    width: 800px;
    margin: 0 auto;
    .title{
        font-size:20px;
        color: #333;
        margin-top: 50px;
        text-align: center;
        font-weight: 600;
    }
    margin-top: 30px;
    .content{
        color: #666;
        font-size: 13px;
    }
}
</style>