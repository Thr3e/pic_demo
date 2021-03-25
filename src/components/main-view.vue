<template>
  <div id="main-content">
    <div class="left-rect flex-rect">
      <LeftMenu @getCData="getCData"/>
    </div>
    <div class="image-rect flex-rect">
      <ImageView :add-data="addData"/>
    </div>
    <div class="right-rect flex-rect">
      <RightOperator :etype="'文字'"/>
    </div>
  </div>
</template>

<script>
import LeftMenu from "./left-menu";
import ImageView from "./image-view";
import RightOperator from "./right-operator";
export default {
  name: "MainView",
  components: {
    LeftMenu,
    ImageView,
    RightOperator,
  },
  data() {
    return {
      isCollapse: true,
      addData:null
    };
  },
  methods: {
    getCData(val){
      this.addData = val;
    }
  },
};
</script>

<style>
#main-content {
  width: 100%;
  height: calc(100% - 4rem);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.left-rect {
  width: 4rem;
  background: #fff;
  box-shadow: 1px 0 4px hsl(0deg 0% 88% / 50%);
}
.image-rect {
  width: calc(100% - 20rem);
}
.right-rect {
  width: 16rem;
  background: #fff;
  box-shadow: -1px 0 4px hsl(0deg 0% 88% / 50%);
}
.flex-rect {
  height: 100%;
}
</style>