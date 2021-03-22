<template>
  <div class="poster-item" @mousedown="move($event)" @mouseover="showBorder(true)" @mouseout="showBorder(false)">
    <div class="border-operators" v-show="isBdShow">
      <div class="item-left-button item-border-btn"></div>
      <div class="item-right-button item-border-btn"></div>
      <div class="item-top-button item-border-btn"></div>
      <div class="item-bottom-button item-border-btn"></div>
      <div class="item-top-left-corner item-corner-btn"></div>
      <div class="item-top-right-corner item-corner-btn"></div>
      <div class="item-bottom-left-corner item-corner-btn"></div>
      <div class="item-bottom-right-corner item-corner-btn"></div>
      <div class="item-rotate-button item-func-btn iconfont iconrotate"></div>
      <div class="item-like-button item-func-btn iconfont iconheart"></div>
    </div>
    <div class="text-area">
      <span v-if="readOnly" class="poster-content readonly" @dblclick="enableEdit(false)">{{posterValue}}</span>
      <input class="poster-content" @blur="enableEdit(true)" v-model="posterValue" v-else>
    </div>
  </div>

</template>

<script>
export default {
  name:'PosterItem',
  data() {
    return {
      posterValue: '双击编辑文字',
      readOnly: true,
      isBdShow: true,
    }
  },
  methods: {
    move(e) {
      console.log(e)
    },
    enableEdit(enable) {
      this.readOnly = enable;
    },
    showBorder(show) {
      this.isBdShow = show;
    }
  }
}
</script>

<style lang="scss" scoped>
.poster-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: move;
  .border-operators {
    .item-border-btn {
      position: absolute;
      width: 2rem;
      height: 5px;
      border-radius: 10px;
      background: #fff;
      border: 1px solid #F45B69;
      &.item-left-button{
        transform: translate(-50%, -50%) rotate(90deg);
        top: 50%;
        left: 0;
        cursor: e-resize;
      }
      &.item-right-button{
        transform: translate(50%, -50%) rotate(90deg);
        top: 50%;
        right: 0;
        cursor: e-resize;
      }
      &.item-top-button{
        transform: translate(-50%, -50%);
        top: 0;
        left: 50%;
        cursor: n-resize;
      }
      &.item-bottom-button{
        transform: translate(-50%, 50%);
        bottom: 0;
        left: 50%;
        cursor: n-resize;
      }
    }
    .item-corner-btn {
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      border: 1px solid #F45B69;
      border-radius: 50%;
      background: #fff;
      &.item-top-left-corner {
        transform: translate(-50%, -50%);
        top: 0;
        left: 0;
        cursor: nw-resize;
      }
      &.item-top-right-corner {
        transform: translate(50%, -50%);
        top: 0;
        right: 0;
        cursor: ne-resize;
      }
      &.item-bottom-left-corner {
        transform: translate(-50%, 50%);
        bottom: 0;
        left: 0;
        cursor: sw-resize;
      }
      &.item-bottom-right-corner {
        transform: translate(50%, 50%);
        bottom: 0;
        right: 0;
        cursor: se-resize;
      }
    }
    .item-func-btn {
      padding: 5px;
      position: absolute;
      left: 50%;
      border-radius: 50%;
      background: #fff;
      border: 1px solid #999;
      cursor: pointer;
      &:hover{
        color: #F45B69;
        border-color: #F45B69;
      }
      &.item-rotate-button{
        bottom: 0;
        transform: translate(-50%, 120%);
      }
      &.item-like-button{
        top: 0;
        transform: translate(-50%, -120%);
      }
    }
  }
  .text-area {
    width: 200px;
    height: 100px;
    .poster-content {
      display: block;
      width: 100%;
      height: 100%;
      background: transparent;
      border: transparent;
      outline: 0;
    }
  }
}
</style>