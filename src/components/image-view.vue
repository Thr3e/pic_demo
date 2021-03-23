<template>
  <div id="image-view" ref="rootBox">
    <div ref="zrenderCanvas"></div>
    <div class="toolbox">
      <div class="scale-box">
        <span class="scale-btn" @click="changeScale(-1)">-</span>
        <span class="number">{{ scaleLabel }}</span>
        <span class="scale-btn" @click="changeScale(1)">+</span>
      </div>
      <div class="original-btn" @click="setScaleOriginal()">1:1</div>
      <div
        class="bestscale-btn iconfont iconquanping"
        @click="setScaleBest()"
      ></div>
    </div>
  </div>
</template>

<script>
import Poster from "./poster";
import * as zrender from "zrender";
export default {
  name: "ImageView",
  components: {
    Poster,
  },
  data() {
    return {
      zr: {},
      mainGroup: {},
      scale: 0.4,
      original: {
        width: 1920,
        height: 900,
      },
      activeItem: null, //zrGroup对象
      activeType: "", //'drag' |'rotate' | 'scale'
    };
  },
  computed: {
    scaleLabel() {
      return (this.scale * 100).toFixed(0) + "%";
    },
  },
  methods: {
    changeScale(step) {
      let scale = parseFloat(
        this.scale + step * (this.scale >= 1 ? 0.1 : 0.05)
      );
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
        renderer: "canvas",
        width,
        height,
      });
      this.zr.on("mousemove", ((e) => {
        if (this.activeItem && this.activeItem.isMouseDown) {
          switch (this.activeType) {
            case "drag":
              this.moveItem(e);
              break;
            case "scale":
              this.scaleItem(e);
              break;
            case "rotate":
              this.rotateItem(e);
              break;
            default:
              break;
          }
        }
      }).bind(this));
      this.zr.on("mouseup", ((event) => {
        if (this.activeItem) {
          this.activeItem.isMouseDown = false;
          this.activeItem.mousePonit = undefined;
          this.activeItem = null;
          this.activeType = "";
        }
      }).bind(this));
      this.mainGroup = new zrender.Group({
        position: [
          (width - this.original.width * this.scale) / 2,
          (height - this.original.height * this.scale) / 2,
        ],
        scale: [this.scale, this.scale],
        original: [width / 2, height / 2],
      });
      const bgRect = new zrender.Rect({
        silent: true,
        style: {
          fill: "#6B2737",
        },
        shape: {
          width: this.original.width,
          height: this.original.height,
        },
      });
      this.mainGroup.add(bgRect);
      this.zr.add(this.mainGroup);
    },
    mainGroupScale() {
      if (this.mainGroup && this.mainGroup.attr) {
        const width = this.$refs.rootBox.offsetWidth;
        const height = this.$refs.rootBox.offsetHeight;
        this.mainGroup.attr({
          scale: [this.scale, this.scale],
          position: [
            (width - this.original.width * this.scale) / 2,
            (height - this.original.height * this.scale) / 2,
          ],
        });
      }
    },
    addImgGroup(image){
      const shape = {
        width: 100,
        height: 100,
      };
      const funcGroup = this.addBoxFunctionBorder(shape);
      const borderRect = new zrender.Rect({
        style: {
          fill: "transparent",
          stroke: "#F45B69",
          lineWidth: 3,
          strokeNoScale: true,
          transformText: true,
        },
        shape: {
          x: 0,
          y: 0,
          width: shape.width,
          height: shape.height
        }
      })
      funcGroup.add(borderRect);
      const imgRect = new zrender.Image({
        style: {
          image,
          x: 0,
          y: 0,
          width: shape.width,
          height: shape.height
        },
        onmousedown: ((e) => {
          funcGroup.isMouseDown = true;
          funcGroup.mousePonit = e.event;
          this.activeItem = funcGroup;
          this.activeType = "drag";
          e.stop(e);
        }).bind(this),
      });
      funcGroup.add(imgRect);
      this.mainGroup.add(funcGroup);
    },
    addTextGroup(text, fontSize, fontFamily) {
      if (!text) {
        return;
      }
      const shape = {
        width: text.length * fontSize * 10,
        height: fontSize * 10,
      };
      const funcGroup = this.addBoxFunctionBorder(shape);
      const borderRect = new zrender.Rect({
        style: {
          fill: "transparent",
          stroke: "#F45B69",
          lineWidth: 3,
          strokeNoScale: true,
          transformText: true,
        },
        shape: {
          x: 0,
          y: 0,
          width: shape.width,
          height: shape.height
        }
      })
      funcGroup.add(borderRect);
      const textRect = new zrender.Rect({
        name: 'content',
        shape: {
          x: 0,
          y: 0,
          width: shape.width,
          height: shape.height,
        },
        cursor: "move",
        style: {
          fill: "transparent",
          text,
          fontFamily,
          textFill: "#fff",
          fontSize: fontSize * 10,
          transformText: true,
          z: 1,
        },
        onmousedown: ((e) => {
          funcGroup.isMouseDown = true;
          funcGroup.mousePonit = e.event;
          this.activeItem = funcGroup;
          this.activeType = "drag";
          e.stop(e);
        }).bind(this),
      });
      funcGroup.add(textRect);
      this.mainGroup.add(funcGroup);
    },
    addBoxFunctionBorder(shape) {
      const funcGroup = new zrender.Group({
        position: [
          (this.original.width - shape.width) / 2,
          (this.original.height - shape.height) / 2,
        ],
        isMouseDown: false,
      });
      const rotateBtn = new zrender.Circle({
        shape: {
          cx: shape.width + 8,
          cy: -8,
          r: 16,
        },
        cursor: "grab",
        style: {
          lineWidth: 1,
          strokeNoScale: true,
          fill: "#fff",
          stroke: "#333",
          z: 2,
        },
        onmousedown: ((e) => {
          funcGroup.isMouseDown = true;
          funcGroup.mousePonit = e.event;
          funcGroup.startRot = funcGroup.rotation[0] || 0
          this.activeItem = funcGroup;
          this.activeType = "rotate";
          e.stop(e);
        }).bind(this),
      });
      funcGroup.add(rotateBtn);
      const scaleBtn = new zrender.Circle({
        shape: {
          cx: shape.width + 8,
          cy: shape.height + 8,
          r: 16,
        },
        cursor: "se-resize",
        style: {
          lineWidth: 1,
          strokeNoScale: true,
          fill: "#fff",
          stroke: "#333",
          z: 2,
        },
        onmousedown: ((e) => {
          funcGroup.isMouseDown = true;
          funcGroup.mousePonit = e.event;
          funcGroup.startPonit = scaleBtn.shape;
          this.activeItem = funcGroup;
          this.activeType = "scale";
          e.stop(e);
        }).bind(this),
      });
      funcGroup.add(scaleBtn);
      return funcGroup;
    },
    moveItem(e) {
      const deltaX = (e.event.x - this.activeItem.mousePonit.x) / this.scale;
      const deltaY = (e.event.y - this.activeItem.mousePonit.y) / this.scale;
      this.activeItem.mousePonit = e.event;
      this.activeItem.attr({
        position: [
          this.activeItem.position[0] + deltaX,
          this.activeItem.position[1] + deltaY,
        ],
      });
    },
    scaleItem(e) {
      const {width, height} = this.activeItem.getBoundingRect();
      const deltaX =
        (e.event.x - this.activeItem.mousePonit.x) / (this.scale * width)
      const deltaY =
        (e.event.y - this.activeItem.mousePonit.y) / (this.scale * height)
      this.activeItem.mousePonit = e.event;
      this.activeItem.attr({
        scale: [this.activeItem.scale[0] + deltaX, this.activeItem.scale[1] + deltaY],
      });
    },
    rotateItem(e) {
      const {width, height} = this.activeItem.getBoundingRect();
      const orgX = (this.activeItem.position[0] + width / 2) * this.scale;
      const orgY = (this.activeItem.position[1] + height / 2) * this.scale;
      const startX = this.activeItem.mousePonit.offsetX - this.mainGroup.position[0];
      const startY = this.activeItem.mousePonit.offsetY - this.mainGroup.position[1];
      const endX = e.event.offsetX - this.mainGroup.position[0];
      const endY = e.event.offsetY - this.mainGroup.position[1];

      //2个点之间的角度获取
      let c1 = Math.atan2(startY - orgY, startX - orgX);
      let c2 = Math.atan2(endY - orgY, endX - orgX);
      c1 = c1 <= -(Math.PI / 2) ? (Math.PI * 2 + c1) : c1;
      c2 = c2 <= -(Math.PI / 2) ? (Math.PI * 2 + c2) : c2;

      //夹角获取
      let angle = c1 - c2;
      angle = angle < 0 ? (angle + 2 * Math.PI) : angle;
      this.activeItem.attr({
        rotation: [angle + this.activeItem.startRot],
        origin: [width / 2, height / 2]
      })
    },
  },
  mounted() {
    this.setScaleBest();
    this.initZr();
    this.addTextGroup("请输入文字", 16, "pang");
    this.addImgGroup(require('../assets/imgs/meta_icon/canju.png'))
  },
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
      .scale-btn {
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
          background: #f45b69;
        }
      }
    }
    .original-btn,
    .bestscale-btn {
      margin-right: 1rem;
      cursor: pointer;
      &:hover {
        color: #f45b69;
      }
    }
  }
}
</style>