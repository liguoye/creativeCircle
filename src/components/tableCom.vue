<template>
  <div class="tableCom">
    <el-table :data="data" border style="width: 100%" :height="tableHeight" v-if="!tableEdit" :row-class-name="tableRowClassName"
      :highlight-current-row="true" @row-click="onRowClick">
      <el-table-column v-for="(item,index) in columns" :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center"></el-table-column>
    </el-table>
    <el-table :data="data" border style="width: 100%" :height="tableHeight" v-if="tableEdit">
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
        <template v-else>
          <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
          </el-table-column>
        </template>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="0">
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
        return [
        ]
      }
    },
    tableHeight: {
      type: Number,
      default () {
        return 300
      }
    },
    edit: {
      type: Boolean,
      default () {
        return false
      }
    },
    data: {
      type: Array,
      default () {
        return [
        ]
      }
    }
  },
  watch: {
    tableHeight (val) {
      this.height = val
    },
    edit (val) {
      this.tableEdit = val
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    tableRowClassName ({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex
    },
    onRowClick (row) {
      this.$emit('rowClick', row, row.index)
    }
  },
  data () {
    return {
      currentPage: 1,
      height: 350,
      tableEdit: false
    }
  }
}
</script>
<style lang="less" scoped>
.pagination {
  text-align: right;
  padding: 10px;
}
</style>
