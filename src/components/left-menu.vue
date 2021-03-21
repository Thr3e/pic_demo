<template>
  <div id="left-menu">
    <ul class="main-list">
      <li class="main-item" v-for="(operate, idx) in operations" :key="idx"
        :class="{ active: operate.isActive }" @click="mainBtnClick(operate)">
        <div class="active-rect"></div>
        <i class="iconfont icon" :class="operate.icon"></i>
        <p class="operation-label">{{ operate.label }}</p>
      </li>
    </ul>
    <div class="collapse-box">
      <Collapse :collapsed="isCollapse"/>
    </div>
  </div>
</template>

<script>
import Collapse from './collapse'
export default {
  name: 'LeftMenu',
  components: {
    Collapse,
  },
  data() {
    return {
      operations: [
        {
          icon: 'iconwenzi',
          label: '特效字',
          isActive: true,
          click: () => {},
        },
        {
          icon: 'iconsucai',
          label: '素材',
          isActive: false,
          click: () => {},
        },
        {
          icon: 'icontupian',
          label: '照片',
          isActive: false,
          click: () => {},
        },
        {
          icon: 'iconbackground',
          label: '背景',
          isActive: false,
          click: () => {},
        },
        {
          icon: 'iconmoban',
          label: '模板',
          isActive: false,
          click: () => {},
        },
        {
          icon: 'iconshangchuan',
          label: '上传',
          isActive: false,
          click: () => {},
        },
        {
          icon: 'icontool',
          label: '工具',
          isActive: false,
          click: () => {},
        },
        {
          icon: 'iconmoban',
          label: '特效',
          isActive: false,
          click: () => {},
        },
        {
          icon: 'iconpiliang',
          label: '批量',
          isActive: false,
          click: () => {},
        },
      ],
      isCollapse: false
    };
  },
  methods: {
    mainBtnClick(o) {
      this.operations.forEach(operator => {
        operator.isActive = operator.label === o.label;
      })
    },
    openCollpase() {
      this.isCollapse = true;
    },
    closeCollpase() {
      this.isCollapse = false;
    }
  },
};
</script>

<style lang="scss" scoped>
#left-menu {
  width: 100%;
  height: 100%;
  position: relative;
  .main-list {
    height: 100%;
    overflow-y: auto;
    .main-item {
      position: relative;
      font-size: .75rem;
      text-align: center;
      cursor: pointer;
      transition: opacity .35s ease;
      padding: 1rem 0;

      &:hover, 
      &.active {
        background: #E4FDE1;
        color: #F45B69;
        .active-rect {
          opacity: 1;
        }
      }
      .active-rect {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 5px;
        height: 60%;
        background: #F45B69;
        opacity: 0;
        transition: opacity .35s ease;
      }
      .icon {
        font-size: 1.25rem;
      }
      .operation-label {
        margin-top: 3px;
      }
    }
  }

  .collapse-box {
    height: 100%;
    position: absolute;
    top: 0;
    left: 100%;
  }
}
</style>
