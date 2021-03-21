<template>
  <div id="collapse">
    <div class="collapse-container" :class="{collapse: isCollapse}">

    </div>
    <div class="collpase-btn" @click="coll()">
      <span v-if="isCollapse">&gt;</span>
      <span v-else>&lt;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Collapse',
  props: {
    collapsed: true,
    reqType: 'text'
  },
  data() {
    return {
      isCollapse: this.collapsed,
      reqData: {}
    }
  },
  methods: {
    coll() {
      this.isCollapse = !this.isCollapse;
    },
    queryDataByType() {
      this.reqData = {
        topBtnList: [{
          label: 'textBtn1',
          
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#collapse {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .collapse-container {
    height: 100%;
    width: 300px;
    transition: width .15s ease-in;
    background: #fff;
  }
  .collapse {
    width: 0!important;
  }
  .collpase-btn {
    width: 1.25rem;
    height: 5rem;
    background: #F45B69;
    color: #fff;
    line-height: 5rem;
    font-size: 1.25rem;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    border-top-right-radius:0.75rem;
    border-bottom-right-radius:0.75rem;
    &:hover {
      color: #E4FDE1;
    }
  }
}
</style>