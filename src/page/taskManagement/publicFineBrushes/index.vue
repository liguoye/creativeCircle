<template>
  <div class="taskManagement">
    <nav-list :current-tab="currentTab"></nav-list>
    <div class="publicFineBrushes">
      <div class="navListShow">
        <ul>
          <li :class="orderProgressState=='firstStep'? 'current' :''">第一步：任务选择类型</li>
          <li :class="orderProgressState=='secondStep'? 'current' :''">第二步：来路设置</li>
          <li :class="orderProgressState=='thirdStep'? 'current' :''">第三步：价格和发布时间</li>
          <li :class="orderProgressState=='fourStep'? 'current' :''">第四步：快递和备注</li>
        </ul>
      </div>
      <div class="stateContent">
        <first-step v-if="orderProgressState=='firstStep'" @changeState="firstStepChange"></first-step>
        <brush-order
          v-if="orderProgressState=='secondStep' && radio=='1'"
          @changeState="changeState"
        ></brush-order>
        <keep-alive>
          <specify-push-task
            v-if="orderProgressState=='secondStep' && radio=='2'"
            @changeState="changeState"
          ></specify-push-task>
        </keep-alive>

        <re-buy-task
          v-if="orderProgressState=='secondStep' && radio=='3'"
          @changeState="changeState"
        ></re-buy-task>
        <third-step v-if="orderProgressState=='thirdStep'" @changeState="changeState"></third-step>
        <four-step v-if="orderProgressState=='fourStep'" @changeState="changeState"></four-step>
      </div>

      <!-- <div>所有数据{{getall}}</div> -->
      <div>
          <div class="item" v-for="(item,index) in getall" :key="index">
              <div v-for="(item2,index2) in item.goods" :key="index2">
                  <div>{{index2}}:</div>
                  <div>{{item2}}:</div>
              </div>
              <div>{{index}}:</div>
              <div>{{item}}</div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import navList from "@/components/taskManagementNavList.vue";
import firstStep from "./firstStep.vue";
import brushOrder from "./secondStep/brushOrder.vue";
import specifyPushTask from "./secondStep/specifyPushTask.vue";
import reBuyTask from "./secondStep/reBuyTask.vue";
import thirdStep from "./thirdStep.vue";
import fourStep from "./fourStep.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    navList,
    firstStep,
    brushOrder,
    specifyPushTask,
    reBuyTask,
    thirdStep,
    fourStep
  },
  data() {
    return {
      currentTab: "publicFineBrushes",
      orderProgressState: "thirdStep",
      radio: "1"
    };
  },
  computed: { ...mapGetters(["getdata"]), ...mapGetters(["getall"]) },
  methods: {
    change() {
      this.$store.commit("update", { name: "releaseFlowList", value: "" });
    },
    ...mapMutations({
      update: "update"
    }),
    changeState(val) {
      this.orderProgressState = val.state;
    },
    firstStepChange(val) {
      this.orderProgressState = val.state;
      this.radio = val.radio;
      this.$store.commit("update", { name: "type", value: val.radio });
    }
  }
};
</script>
<style lang="less" scoped>
.taskManagement {
  .publicFineBrushes {
    width: 1150px;
    margin: 0 auto;
    .navListShow {
      margin-top: 20px;
      ul {
        width: 100%;
        font-size: 0;
        li {
          font-size: 15px;
          display: inline-block;
          width: 25%;
          box-sizing: border-box;
          height: 45px;
          line-height: 45px;
          text-align: center;
          border: 1px solid #3cc;
          border-right: 0;
          &:last-child {
            border-right: 1px solid #3cc;
          }
        }
        .current {
          background: #3cc !important;
          color: #fff !important;
        }
      }
    }
  }
}
</style>
