<template>
  <div id="image-view" ref="rootBox">
      <div ref="zrenderCanvas"></div>
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
import * as zrender from 'zrender';
export default {
  name: "ImageView",
  components:{
    Poster
  },
  data() {
    return {
      zr: {},
      mainGroup: {},
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
  },
  methods: {
    changeScale(step) {
      let scale = parseFloat(this.scale + step * (this.scale >= 1 ? 0.1 : 0.05));
      if (scale > 2) {
        scale = 2;
      }
      if (scale < 0.1) {
        scale = 0.1;
      }
      this.scale = scale;
      this.mainGroupScale();
    },
    setScaleOriginal() {
      this.scale = 1;
      this.mainGroupScale();
    },
    setScaleBest() {
      this.scale = 0.4;
      this.mainGroupScale();
    },
    initZr() {
      const width = this.$refs.rootBox.offsetWidth;
      const height = this.$refs.rootBox.offsetHeight;
      this.zr = zrender.init(this.$refs.zrenderCanvas, {
        renderer: 'canvas',
        width,
        height,
      })
      this.mainGroup = new zrender.Group({
        position: [
          (width - this.original.width * this.scale) / 2,
          (height - this.original.height * this.scale) / 2,
        ],
        scale: [this.scale, this.scale],
        original: [width / 2, height / 2]
      });
      const bgRect = new zrender.Rect({
        silent:true,
        style: {
          fill: '#6B2737',
        },
        shape: {
          width: this.original.width,
          height: this.original.height
        }
      })
      this.mainGroup.add(bgRect);
      this.zr.add(this.mainGroup);
    },
    mainGroupScale() {
      if (this.mainGroup && this.mainGroup.attr) {
        this.mainGroup.attr('scale', [this.scale, this.scale]);
      }
    },
    addTextItem(content, fontSize) {
      const textGroup = new zrender.Group({
        
        });
      const textRect = new zrender.Rect({
        draggable: true,
        name: 'textRect',
        cursor: 'move',
        style: {
          text:content,             //文字
          textFill:'#E4FDE1',             //文字颜色
          fontSize: fontSize * 10,                 //文字小
          fontFamily:'pang',               //字体
          transformText:true,
          lineWidth: 3,
          strokeNoScale: true,
          fill: 'transparent',
          stroke: '#114B5F',
          z:1
        },
        shape: {
          r: 5,
          x: 0,
          y: 0,
          width: fontSize * 10 * content.length,
          height: fontSize * 10
        }
      })
      textGroup.add(textRect);
      const rotateBtn = new zrender.Circle({
        shape: {
          cx: fontSize * 10 * content.length,
          cy: fontSize * 10,
          r: 15
        }, 
        isMouseDown: false,
        cursor: 'se-resize',
        style: {
          lineWidth: 1,
          strokeNoScale: true,
          fill: '#fff',
          stroke: '#333',
          z:2
        },
        onmousedown(e) {
          this.isMouseDown = true;
        },
        onmousemove(e) {
          if(this.isMouseDown) {
            this.attr({
              shape: {
                cx: e.event.x,
                cy: e.event.y,
              }
            })
          }
        },
        onmouseup(e) {
          this.isMouseDown = false;
        }
      })
      textGroup.add(rotateBtn);
      this.mainGroup.add(textGroup)
    },
  },
  mounted() {
    this.setScaleBest();
    this.initZr();
    this.addTextItem('双击编辑文字', 16);
  }
};
</script>

<style lang="scss" scoped>
#image-view {
  width: 100%;
  height: 100%;
  position: relative;
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