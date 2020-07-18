<template>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column :label="thead" width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="具体" width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.value }}</span>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot="header">
        <el-button type="primary" @click="btn">新增</el-button>
      </template>
      <template slot-scope="scope">
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "adParameterTable",
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    thead: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      label: ""
    };
  },
  methods: {
    btn() {
      this.$emit("btn");
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      this.$emit("update:tableData", this.tableData);
    }
  }
};
</script>

<style scoped>
</style>