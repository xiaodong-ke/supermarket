<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" center>
      <span>
        <el-row>
          <el-col :span="12">
            <el-input v-model="obj.name" placeholder="请输入名称"></el-input>
          </el-col>
          <el-col :span="12">
            <el-input v-model="obj.value" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  data() {
    return {
      dialogVisible: false,
      title: "",
      obj: {
        name: "",
        value: ""
      },
      flag: true
    };
  },
  methods: {
    submit() {
      // console.log(this.obj);
      this.$emit("pushObj", this.obj, this.flag);
      this.obj = {};
      this.dialogVisible = false;
    }
  }
};
</script>