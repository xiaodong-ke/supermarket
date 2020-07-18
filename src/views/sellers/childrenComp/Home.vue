<template>
  <!-- <el-row>
    <el-col :span="12">
      <div id="echarts"></div>
    </el-col>
    <el-col :span="12"></el-col>
  </el-row>-->
  <div class="container">
    <div id="echarts1"></div>
    <div id="echarts2"></div>
    <div id="echarts3"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "",
  data() {
    return {
      myChart1: {},
      option1: {},
      myChart2: {},
      option2: {},
      myChart3: {},
      option3: {},
      orderSummaryList: [],
      categorySummaryList: [],
      productSummaryList: []
    };
  },
  watch: {
    orderSummaryList(newVal, oldVal) {
      if (this.myChart1) {
        // console.log(newVal);
        this.orderSummaryList = newVal;
        this.myChart1.setOption(this.option1);
      }
    },
    categorySummaryList(newVal, oldVal) {
      if (this.myChart2) {
        // console.log(newVal);
        this.categorySummaryList = newVal;
        this.myChart2.setOption(this.option2);
      }
    },
    productSummaryList(newVal, oldVal) {
      if (this.myChart3) {
        // console.log(newVal);
        this.productSummaryList = newVal;
        this.myChart3.setOption(this.option3);
      }
    }
  },
  created() {
    this.$http.get("static-data/getStaticSummaryData").then(res => {
      // console.log(res);
      if (res.data.code == 200) {
        let data = res.data.data;
        data.orderSummaryList.forEach((value, index) => {
          let obj = {};
          obj.value = value.value;
          obj.name = value.name;
          this.orderSummaryList.push(obj);
        });
        data.categorySummaryList.forEach((value, index) => {
          let obj = {};
          obj.value = value.value;
          obj.name = value.name;
          this.categorySummaryList.push(obj);
        });
        data.productSummaryList.forEach((value, index) => {
          let obj = {};
          obj.value = value.value;
          obj.name = value.name;
          this.productSummaryList.push(obj);
        });
        // this.orderSummaryList = data.orderSummaryList;
        // this.categorySummaryList = data.categorySummaryList;
        // this.productSummaryList = data.productSummaryList;
      } else {
        this.$message.error(res.data.message)
      }
    });
  },
  mounted() {
    this.myChart1 = echarts.init(document.querySelector("#echarts1"));
    this.option1 = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: 10
      },
      series: [
        {
          name: "发货/退款",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          // data: [
          //   { value: 335, name: "直接访问" },
          //   { value: 310, name: "邮件营销" },
          //   { value: 234, name: "联盟广告" },
          //   { value: 135, name: "视频广告" },
          //   { value: 1548, name: "搜索引擎" }
          // ]
          data: this.orderSummaryList
        }
      ]
    };
    this.myChart2 = echarts.init(document.querySelector("#echarts2"));
    this.option2 = {
      title: {
        text: "商品种类",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
      },
      series: [
        {
          name: "种类",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          // data: [
          //   { value: 335, name: "直接访问" },
          //   { value: 310, name: "邮件营销" },
          //   { value: 234, name: "联盟广告" },
          //   { value: 135, name: "视频广告" },
          //   { value: 1548, name: "搜索引擎" }
          // ],
          data: this.categorySummaryList,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };

    this.myChart3 = echarts.init(document.querySelector("#echarts3"));
    this.option3 = {
      title: {
        text: "商品上架情况",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        // data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
      },
      series: [
        {
          name: "商品",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          // data: [
          //   { value: 335, name: "直接访问" },
          //   { value: 310, name: "邮件营销" },
          //   { value: 234, name: "联盟广告" },
          //   { value: 135, name: "视频广告" },
          //   { value: 1548, name: "搜索引擎" }
          // ],
          data: this.productSummaryList,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  padding: 20px;
}
#echarts1 {
  flex: 1;
  width: 360px;
  height: 360px;
}
#echarts2 {
  flex: 1;
  width: 360px;
  height: 360px;
}
#echarts3 {
  flex: 1;
  width: 360px;
  height: 360px;
}
</style>