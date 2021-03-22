<template>
  <div id="image-view" ref="rootBox">
    <div class="center-area" :style="{width: showSize.width + 'px', height: showSize.height + 'px'}">
      <Poster/>
    </div>
    <div class="toolbox">
      <div class="scale-box">
        <span class="scale-btn" @click="changeScale(-1)">-</span>
        <span class="number">{{scaleLabel}}</span>
        <span class="scale-btn" @click="changeScale(1)">+</span>
      </div>
      <div class="original-btn" @click="setScaleOriginal()">1:1</div>
      <div class="bestscale-btn iconfont iconquanping" @click="setScaleBest()"></div>
    </div>
  </div>
</template>

<script>
import Poster from './poster'
export default {
  name: "ImageView",
  components:{
    Poster
  },
  data() {
    return {
      scale: 0.4,
      original: {
        width: 1920,
        height: 900
      }
    }
  },
  computed: {
    scaleLabel() {
      return (this.scale * 100).toFixed(0) + '%';
    },
    showSize() {
      return {
        width: this.original.width * this.scale,
        height: this.original.height * this.scale
      }
    }
  },
  methods: {
    changeScale(step) {
      let scale = parseFloat(this.scale + step * 0.05);
      if (scale > 2) {
        scale = 2;
      }
      if (scale < 0.1) {
        scale = 0.1;
      }
      this.scale = scale;
    },
    setScaleOriginal() {
      this.scale = 1
    },
    setScaleBest() {
      this.scale = 0.4
    }
  },
  mounted() {
    this.setScaleBest();
  }
};
</script>

<style lang="scss" scoped>
#image-view {
  width: 100%;
  height: 100%;
  position: relative;
  .center-area {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
  }
  .toolbox {
    user-select: none;
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    background: #fff;
    border-radius: 2rem;
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    .scale-box {
      padding: 1rem;
      .scale-btn{
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin: 0 1rem;
        line-height: 0.9rem;
        color: #fff;
        background: #666;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
        &:hover {
          background: #F45B69;
        }
      }
    }
    .original-btn ,
    .bestscale-btn {
      margin-right: 1rem;
      cursor: pointer;
      &:hover{ 
        color: #F45B69;
      }
    }
  }
}
</style>