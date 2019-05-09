<template>
  <div class="tableCom">
    <el-table :data="data" border style="width: 100%" :height="tableHeight" v-if="!edit" :row-class-name="tableRowClassName"
      :highlight-current-row="true" @row-click="onRowClick">
      <el-table-column v-for="(item,index) in columns" :key="index" :width="item.width" :prop="item.code" :label="item.name"
        align="center"></el-table-column>
    </el-table>
    <el-table :data="data" border style="width: 100%" :height="tableHeight" v-if="edit">
      <template v-for="(item,index) in columns">
        <template v-if="item.com=='input'">
          <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
            <template slot-scope="scope">
              <el-input v-model="data[scope.$index][item.code]"></el-input>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.com=='select'">
          <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
            <template slot-scope="scope">
              <el-input v-model="data[scope.$index][item.code]"></el-input>
            </template>
          </el-table-column>
        </template>
        <template v-if="item.com=='btn'">
          <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                        class="tableCellBtn"
                        type="primary"
                        size="mini"
                        @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button>-->
              <el-button class="tableCellBtn" type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">设置标记状态</el-button>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.com=='hongqi'">
          <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
            <template slot-scope="scope">
              <div class="plate">
                <img v-if="data[scope.$index]['flag']==0" style="width:20px" src="../assets/picture/black.png" alt=""
                  srcset="">
                <img v-else-if="data[scope.$index]['flag']==1" style="width:20px" src="../assets/picture/yellow.png"
                  alt="" srcset="">
                <img v-else-if="data[scope.$index]['flag']==2" style="width:20px" src="../assets/picture/green.png" alt=""
                  srcset="">
                <img v-else-if="data[scope.$index]['flag']==3" style="width:20px" src="../assets/picture/blue.png" alt=""
                  srcset="">
                <img v-else-if="data[scope.$index]['flag']==4" style="width:20px" src="../assets/picture/pink.png" alt=""
                  srcset="">
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column :key="index " :width="item.width " :prop="item.code " :label="item.name " align="center ">
          </el-table-column>
        </template>
      </template>
    </el-table>
    <div class="pagination ">
      <el-pagination @current-change="handleCurrentChange " :current-page="page" :page-sizes="[20]" layout="total, sizes, prev, pager, next, jumper "
        :total="total ">
      </el-pagination>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default () {
        return [];
      }
    },
    tableHeight: {
      type: Number,
      default () {
        return 300;
      }
    },
    pageSize: {
      type: Number,
      default () {
        return 20;
      }
    },
    currentPage: {
      type: Number,
      default () {
        return 1;
      }
    },
    total: {
      type: Number,
      default () {
        return 0;
      }
    },
    edit: {
      type: Boolean,
      default () {
        return false;
      }
    },
    data: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  watch: {
    tableHeight (val) {
      this.height = val;
    },
    edit (val) {
      this.tableEdit = val;
    },
    currentPage (val) {
      this.page = val;
    }
  },
  methods: {
    handleEdit (index, row) {
      this.$emit('rowClick', index, row)
    },
    handleCurrentChange (val) {
      this.page = val;
      this.$emit("handleCurrentChange", val);
    },
    tableRowClassName ({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },
    onRowClick (row) {
      this.$emit("rowClick", row, row.index);
    }
  },
  data () {
    return {
      height: 350,
      tableEdit: false,
      page: 0
    };
  }
};
</script>
<style lang="less" scoped>
.pagination {
  text-align: right;
  padding: 10px;
}
</style>
