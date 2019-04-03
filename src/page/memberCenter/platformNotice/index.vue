<template>
  <div class="platformNotice">
    <el-row>
      <el-col :span="4" class="navList">
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col :span="18" class="accountManage">
        <div class="table">
          <table-com :columns="tableData.columns" :data="tableData.data" :table-height="tableHeight"></table-com>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import tableCom from '@/components/tableCom.vue'
import navList from '../components/treeNavList.vue'
export default {
  components: {
    navList,
    tableCom
  },
  props: {
  },
  data () {
    return {
      currentTab: 'platformNotice',
      tableHeight: 560,
      tableData: {
        data: [
          {
            'noticeNo': 'bf4f6fe5538e4e1699996bfcea25b7e7',
            'title': '拾货网平台商家入驻',
            'publishDate': '2018-09-05 09:41:38',
            'source': '系统'
          },
          {
            'noticeNo': 'e46b1a49d9c2443483a8e93207785815',
            'title': '拾货网平台简介',
            'publishDate': '2018-09-05 09:28:30',
            'source': '系统'
          },
          {
            'noticeNo': '1b686702acf64004bf642a64fd6ddaf4',
            'title': '拾货网诚邀体验',
            'publishDate': '2018-09-05 09:08:05',
            'source': '系统'
          },
          {
            'noticeNo': '6593f4791444469cafd2f2e4ba7bc8ca',
            'title': '浦发银行批量转账问题详解',
            'publishDate': '2018-07-02 15:16:26',
            'source': '系统'
          },
          {
            'noticeNo': '7b9976596fb541f5b0c819f444f87baf',
            'title': '浦发银行批量转账说明',
            'publishDate': '2018-07-02 14:02:50',
            'source': '系统'
          },
          {
            'noticeNo': 'c956b82ced1a4aa0bc2c2becf2522e21',
            'title': '商家担保金机制',
            'publishDate': '2018-05-23 21:24:49',
            'source': '系统'
          },
          {
            'noticeNo': '032dc86f7ef9441a8075bf6d3a67a264',
            'title': '招商银行批量转账说明',
            'publishDate': '2017-10-04 19:37:16',
            'source': '系统'
          },
          {
            'noticeNo': '3573fca671be4d79a16817151c2c1d9d',
            'title': '卖家转账常见问题',
            'publishDate': '2017-10-01 16:05:09',
            'source': '系统'
          },
          {
            'noticeNo': '31c1c7def9f1417ea31ff29c4c881ecd',
            'title': '招商银行批量转账问题详解',
            'publishDate': '2017-10-01 11:04:04',
            'source': '系统'
          },
          {
            'noticeNo': '5cf183c7d2c540ed9245454f4ca70d5b',
            'title': '商家新手教程',
            'publishDate': '2017-05-03 12:54:01',
            'source': '系统'
          }
        ],
        columns: [
          { name: '标题', code: 'title', width: '500' },
          { name: '时间', code: 'publishDate', width: '230' },
          { name: '来自', code: 'source', width: '' }
        ]
      }
    }
  },
  methods: {
    navListClick (val) {
      this.$router.push({ name: val, param: { tab: val } })
    }
  }
}
</script>
<style lang="less" scoped>
.platformNotice {
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  .submitBtn {
    border-radius: 15px;
    margin-left: 10px;
  }
  .el-row {
    width: 100%;
  }
  .navList {
    width: 170px;
  }
  .accountManage {
    padding: 0 40px;
    width: calc(100% - 170px) !important;
    box-sizing: border-box;
    border-left: 1px solid #dfe6ec;
  }
}
</style>
