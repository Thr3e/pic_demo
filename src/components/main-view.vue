<template>
  <div id="main-content">
    <div class="left-rect flex-rect">
      <LeftMenu />
    </div>
    <div class="image-rect flex-rect">
      <ImageView />
    </div>
    <div class="right-rect flex-rect">
      <RightOperator />
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
    };
  },
  methods: {},
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
}
.image-rect {
  width: calc(100% - 20rem);
}
.right-rect {
  width: 16rem;
  background: #fff;
}
.flex-rect {
  height: 100%;
}
</style>