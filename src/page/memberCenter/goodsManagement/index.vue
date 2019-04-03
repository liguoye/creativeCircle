<template>
  <div class="goodsManagement">
    <el-row>
      <el-col :span="3" class="navList">
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col :span="19" class="accountManage">
        <div class="hyzx_bz">
          <el-row>
            <el-col :span="4" class="title"> 添加商品步骤：</el-col>
            <el-col :span="20" class="step">
              <ul>
                <li><em>1</em>添加商品</li>
                <li><em>2</em>设置目标客户</li>
                <li><em>3</em>设置购买行为</li>
              </ul>
            </el-col>
          </el-row>
        </div>
        <div class="btnGroup">
          <el-row>
            <el-col :span="18" class="formGroup" style="text-align:left !important">
              <span>掌柜号: </span>
              <el-select v-model="formData.manager.value" placeholder="请选择">
                <el-option v-for="item in formData.manager.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="formData.name" placeholder="简称/名称"></el-input>
              <el-input v-model="formData.GoodId" placeholder="商品ID"></el-input>
            </el-col>
            <el-col :span="6" style="line-height:40px">
              <el-button class="tablebtnFFF">刷新</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" style="text-align:left;margin-top:10px;">
              <el-button class="tablebtnActive">编辑</el-button>
              <el-button class="tablebtnActive">删除</el-button>
              <el-button class="tablebtnActive">目标客户</el-button>
              <el-button class="tablebtnActive">购买行为</el-button>
              <el-button class="tablebtnActive">查看详情</el-button>
            </el-col>
            <el-col :span="4" style="line-height:40px">
              <el-button class="tablebtnActive">查询</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <table-com :columns="tableData.columns"></table-com>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import navList from '../components/treeNavList.vue'
import tableCom from '@/components/tableCom.vue'
export default {
  components: {
    navList,
    tableCom
  },
  props: {
  },
  data () {
    return {
      currentTab: 'goodsManagement',
      formData: {
        manager: {
          value: '全部',
          options: [
            { label: '全部', value: '全部' },
            { label: 'tourmate途美利威专卖店', value: 'tourmate途美利威专卖店' },
            { label: '羽马汽车用品专营店', value: '羽马汽车用品专营店' }
          ]
        },
        name: '',
        GoodId: ''
      },
      tableData: {
        data: [],
        columns: [
          { name: '简称', code: 'task1', width: '' },
          { name: '商品名称', code: 'task2', width: '' },
          { name: '商品ID', code: 'task3', width: '' },
          { name: '状态', code: 'task4', width: '' }
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
.goodsManagement {
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
    .hyzx_bz {
      background: url("../../../assets/picture/kjk.jpg") no-repeat 130px 10px;
      height: 84px;
      margin-bottom: 29px;
      .title {
        font-size: 15px;
        line-height: 84px;
        color: #457ee8;
        width: 120px;
      }
      .step {
        width: calc(100% - 120px);
      }
      ul {
        li {
          height: 22px;
          line-height: 18px;
          margin: 63px 150px 0 0;
          font-size: 14px;
          color: #666;
          display: inline-block;
          font-weight: 400;
          list-style: none;
          em {
            border: 1px solid #666;
            margin-right: 5px;
            font-style: normal;
            border-radius: 100%;
            height: 15px;
            width: 15px;
            float: left;
            text-align: center;
            line-height: 15px;
            color: #666;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
