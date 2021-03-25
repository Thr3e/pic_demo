<template>
  <div id="image-view" ref="rootBox">
    <div ref="zrenderCanvas" @drop="drop" @dragover.prevent></div>
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
import Bus from '../service/eventBus'
export default {
  name: "ImageView",
  components: {
    Poster,
  },
  props: {
    addData: null
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
      selectItem: null, //zrGroup对象
    };
  },
  computed: {
    scaleLabel() {
      return (this.scale * 100).toFixed(0) + "%";
    },
  },
  methods: {
    changeScale(step) {
      this.scale = parseFloat(
        this.scale + step * (this.scale >= 1 ? 0.1 : 0.05)
      );
    },
    setScaleOriginal() {
      this.scale = 1;
    },
    setScaleBest() {
      this.scale = 0.4;
    },
    drop(e) {
      let data = {}
      try {
        data = JSON.parse(e.dataTransfer.getData('item'))
      } catch {
        return;
      }
      const {offsetX, offsetY} = e;
      const [orgX, orgY] = this.mainGroup.position;
      const scale = this.mainGroup.scale[0];
      const pos = [
        (offsetX - orgX) / scale,
        (offsetY - orgY) / scale
      ]
      switch(data.type) {
        case 'text':
          this.addTextGroup("请输入文字", 160, data.data, pos);
          break;
        case 'meta':
          this.addImgGroup(data.data, pos);
          break;
        case 'back':
          this.changeBgColor(data.data)
          break;
        default:
          break;
      }
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
        name:'bgRect',
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
    mainGroupScale(scale) {
      if (this.mainGroup && this.mainGroup.attr) {
        const width = this.$refs.rootBox.offsetWidth;
        const height = this.$refs.rootBox.offsetHeight;
        this.mainGroup.attr({
          scale: [scale, scale],
          position: [
            (width - this.original.width * scale) / 2,
            (height - this.original.height * scale) / 2,
          ],
        });
      }
    },
    addImgGroup(image, pos){
      const shape = {
        width: 100,
        height: 100,
      };
      let position = pos ? pos : [
        (this.original.width - shape.width) / 2,
        (this.original.height - shape.height) / 2,
      ];
      const funcGroup = new zrender.Group({
        position,
        isMouseDown: false,
        type: 'meta'
      });
      const imgRect = new zrender.Image({
        name: 'content',
        shape,
        style: {
          image,
          x: 0,
          y: 0,
          width: shape.width,
          height: shape.height
        },
        onclick: (e => {
          this.selectItem = funcGroup;
          e.stop();
        })
      });
      funcGroup.add(imgRect);
      this.selectItem = funcGroup;
      this.mainGroup.add(funcGroup);
    },
    addTextGroup(text, fontSize, fontFamily, pos) {
      if (!text) {
        return;
      }
      const shape = {
        width: text.length * fontSize,
        height: fontSize,
      };
      let position = pos ? pos : [
        (this.original.width - shape.width) / 2,
        (this.original.height - shape.height) / 2,
      ];
      const funcGroup = new zrender.Group({
        position,
        isMouseDown: false,
        type:'text'
      });
      const textRect = new zrender.Rect({
        name: 'content',
        shape: {
          x: 0,
          y: 0,
          width: shape.width,
          height: shape.height,
        },
        style: {
          fill: "transparent",
          text,
          fontFamily,
          textFill: "#fff",
          fontSize: fontSize,
          transformText: true,
          z: 1,
        },
        onclick: (e => {
          this.selectItem = funcGroup;
          e.stop();
        })
      });
      funcGroup.add(textRect);
      this.selectItem = funcGroup;
      this.mainGroup.add(funcGroup);
    },
    getBorderRect(shape, father){
      const funcGroup = new zrender.Group({
        name: 'funcGroup',
        position: [0,0],
        isMouseDown: false,
      });
      const borderRect = new zrender.Rect({
        name: 'border-rect',
        style: {
          fill: "transparent",
          stroke: "#F45B69",
          lineWidth: 3,
          strokeNoScale: true,
          transformText: true,
        },
        cursor: "move",
        shape: {
          x: 0,
          y: 0,
          width: shape.width,
          height: shape.height
        },
        onmousedown: ((e) => {
          father.isMouseDown = true;
          father.mousePonit = e.event;
          this.activeItem = father;
          this.activeType = "drag";
          e.stop(e);
        }).bind(this),
      })
      const rotateBtn = new zrender.Circle({
        name: 'rotate-btn',
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
          father.isMouseDown = true;
          father.mousePonit = e.event;
          father.startRot = father.rotation[0] || 0
          this.activeItem = father;
          this.activeType = "rotate";
          e.stop(e);
        }).bind(this),
      });
      const scaleBtn = new zrender.Circle({
        name: 'scale-btn',
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
          father.isMouseDown = true;
          father.mousePonit = e.event;
          father.startPonit = scaleBtn.shape;
          this.activeItem = father;
          this.activeType = "scale";
          e.stop(e);
        }).bind(this),
      });
      funcGroup.add(borderRect)
      funcGroup.add(rotateBtn)
      funcGroup.add(scaleBtn)
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
      const deltaX =
        (e.event.x - this.activeItem.mousePonit.x) / (this.scale)
      const deltaY =
        (e.event.y - this.activeItem.mousePonit.y) / (this.scale)
      this.activeItem.mousePonit = e.event;
      this.scaleFoo(this.activeItem, deltaX, deltaY);
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
    scaleFoo(item, deltaX, deltaY) {
      item.eachChild(c => {
        if (c instanceof zrender.Group) {
          c.eachChild(cc => {
            if (cc.name === 'border-rect') {
              cc.attr({
                shape: {
                  width: cc.shape.width + deltaX,
                  height: cc.shape.height + deltaY,
                }
              })
            } else if (cc.name === 'rotate-btn') {
              cc.attr({
                position: [
                  cc.position[0] + deltaX,
                  cc.position[1] + 0
                ]
              })
            } else if (cc.name === 'scale-btn') {
              cc.attr({
                position: [
                  cc.position[0] + deltaX,
                  cc.position[1] + deltaY
                ]
              })
            }
          })
        } else if (c instanceof zrender.Image) {
          c.attr({
            style: {
              width: c.style.width + deltaX,
              height: c.style.height + deltaY,
            }
          })
        } else if (c instanceof zrender.Rect) {
          const tLeng = c.style.text.length;
          const tSize = c.style.fontSize;
          c.attr({
            style:{
              fontSize: (tSize * tLeng + deltaX) / tLeng
            },
            shape: {
              width: c.shape.width + deltaX,
              height: c.shape.height + deltaY,
            }
          })
        }
      })
    },
    changeBgColor(color) {
      if (this.mainGroup && this.mainGroup.childOfName) {
        const bgRect = this.mainGroup.childOfName('bgRect')
        if (bgRect && bgRect.attr) {
          this.selectItem = null;
          Bus.$emit('activeItem', {
            type: 'back',
            data: {color}
          });
          bgRect.attr({
            style: {
              fill: color
            }
          })
        }
      }
    },
    addBusListener() {
      Bus.$on('change-back', data => {
        if (this.mainGroup && this.mainGroup.childOfName) {
          this.mainGroup.childOfName('bgRect').attr({
            style: {
              fill: data.color
            }
          })
        }
      })
      Bus.$on('change-meta', data => {
        if (this.mainGroup && this.mainGroup.childOfName) {
          const {width, height} = this.selectItem.childOfName('content').style;
          this.scaleFoo(this.selectItem, data.size - width, data.size - height);
        }
      })
      Bus.$on('change-text', data => {
        if (this.mainGroup && this.mainGroup.childOfName) {
          const target = this.selectItem.childOfName('content');
          const tSize = data.fontSize;
          const tLeng = data.text.length;
          const {width, height} = target.shape

          target.attr({
            style: {
              text: data.text,
              fontFamily: data.fontFamily,
              textFill: data.textFill,
            }
          })
          this.scaleFoo(this.selectItem, tSize * tLeng - width, tSize - height);
        }
      })
      Bus.$on('deleteItem', () => {
        if(this.mainGroup && this.selectItem) {
          this.mainGroup.remove(this.selectItem);
          this.selectItem = null;
        }
      })
    }
  },
  mounted() {
    this.setScaleBest();
    this.initZr();
    this.addImgGroup(require('../assets/imgs/meta_icon/canju.png'), [920, 550]);
    this.addTextGroup("请输入文字", 160, "");
    this.addBusListener();
  },
  watch: {
    scale(val) {
      if (val > 2) {
        this.scale = 2;
      }
      if (val < 0.1) {
        this.scale = 0.1;
      }
      this.mainGroupScale(val);
    },
    addData(val) {
      switch(val.type) {
        case 'text':
          this.addTextGroup("请输入文字", 160, val.data);
          break;
        case 'meta':
          this.addImgGroup(val.data);
          break;
        case 'back':
          this.changeBgColor(val.data)
          break;
        default:
          break;
      }
    },
    selectItem(val, oldval) {
      if (oldval && oldval.remove) {
        oldval.remove(oldval.childOfName("funcGroup"));
      }
      if (val) {
        val.add(this.getBorderRect(val.childOfName("content").shape, val));
        const opt = {
          type: val.type,
          data: {}
        }
        if (val.type === 'meta') {
          opt.data = {
            size: val.childOfName('content').style.width
          }
        } else if (val.type === 'text') {
          const style = val.childOfName('content').style;
          opt.data = {
            text: style.text,
            fontSize: style.fontSize,
            fontFamily: style.fontFamily,
            textFill: style.textFill,
          };
        }
        Bus.$emit('activeItem', opt);
      }
    }
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