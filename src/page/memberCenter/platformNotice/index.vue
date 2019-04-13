<template>
  <div class="platformNotice">
    <el-row>
      <el-col :span="4" class="navList">
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col :span="18" class="accountManage">
        <div class="table">
          <table>
            <tr>
              <th>标题</th>
              <th>时间</th>
            </tr>
            <tr class="cp" v-for="(item,index) in tableData.data" :key="index" @click="toDetail(item.id)">
                <td>{{item.title}}</td>
                <td>{{item.ct}}</td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import tableCom from "@/components/tableCom.vue";
import navList from "../components/treeNavList.vue";
export default {
  components: {
    navList,
    tableCom
  },
  props: {},
  data() {
    return {
      currentTab: "platformNotice",
      tableHeight: 560,
      tableData: {
        data: [],
        columns: [
          { name: "标题", code: "title", width: "600" },
          { name: "时间", code: "ct", width: "350" }
        ]
      }
    };
  },
  created() {
    this.getNotice();
  },
  methods: {
    toDetail(id) {
      this.$router.push('/noticeDetail/'+id);
    },
    getNotice() {
      this.$ajax.get("login/noticeList").then(res => {
        if (res && res.data && res.data.code == 1) {
          this.tableData.data = res.data.data;
          console.log(res);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.platformNotice {
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  table{
      width: 100%;
      border: 1px solid #f1f1f1;
      .cp{
          cursor: pointer;
      }
      th{
          padding: 15px;
          color: #fff;
          background: #0099e5;
      }
      td{
          padding: 10px;
          text-align: center;
      }
  }
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
