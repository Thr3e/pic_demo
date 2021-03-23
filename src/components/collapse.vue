<template>
  <div id="collapse">
    <div class="collapse-container" :class="{collapse: $store.state.leftCollapse}">
      <div class="btn-list" v-if="btnData && btnData.length > 0">
        <ul class="btn-ul">
          <li class="btn-item" v-for="(item, idx) in btnData" :key="'button-' + idx" @click="btnClick(item)">
            <i class="btn-icon iconfont">{{item.icon}}</i>
            <span class="btn-label">{{item.label}}</span>
          </li>
        </ul>
      </div>
      <div class="tab-list">
        <div class="tab-btns">
          <div class="tab-btn" @click="tabBtnClick(0)" :class="{active: activeTab===0}">热门</div>
          <div class="tab-btn" @click="tabBtnClick(1)" :class="{active: activeTab===1}">最近使用</div>
          <div class="tab-btn" @click="tabBtnClick(2)" :class="{active: activeTab===2}">收藏</div>
        </div>
        <div class="tab-data-list">
          <template v-if="tabData && tabData.length > 0">
            <div class="data-entry" v-for="(data, idx) in tabData" :key="'entry-' + idx">
              <p class="entry-title">{{data.label}}</p>
              <span class="more" @click="clickMore()">更多<i class="iconfont iconzhankai"></i></span>
              <div class="entry-list">
                <div class="entry-item" :class="data.iconType" v-for="(item, i) in data.items" :key="'entry-item-' + i"
                  @click="passCData(item.param)">
                  <img v-if="item.param.type==='meta'" :src="item.src">
                  <span v-else-if="item.param.type==='text'" :style="{fontFamily: item.param.data}">文字</span>
                  <p v-else-if="item.param.type==='back'" :style="{background: item.param.data}" class="back-item"></p>
                </div>
              </div>
            </div>
          </template>
          <div class="no-data" v-else></div>
        </div>
      </div>
    </div>
    <div class="collpase-btn" @click="coll()">
      <span v-if="$store.state.leftCollapse" class="iconfont iconzhankai"></span>
      <span v-else class="iconfont iconxuanxiangqiajiantou"></span>
    </div>
  </div>
</template>

<script>
import getBasicDataByType from '../service/getBasicData';
export default {
  name: 'Collapse',
  props: {
    reqType: ''
  },
  data() {
    return {
      activeTab: 0,
      tabBasicData: {
        normal: [],
        recent: [],
        collection: [],
      },
      btnData: [],
      tabData:[],
    }
  },
  methods: {
    coll() {
      if(this.$store.state.leftCollapse) {
        this.$store.commit('openCollapse');
      } else {
        this.$store.commit('closeCollapse');
      }
    },
    btnClick(btnItem) {

    },
    tabBtnClick(idx) {
      this.activeTab = idx;
      const tabIndex = ['normal', 'recent', 'collection']
      this.tabData = this.tabBasicData[tabIndex[idx]];
    },
    clickMore() {

    },
    queryDataByType(type) {
      const basicData = getBasicDataByType(type);
      this.tabBasicData = basicData.tabBasicData;
      this.btnData = basicData.btnData;
    },
    passCData(val){
      //触发父组件father中的事件
      this.$emit('getCData',val)
    }

  },
  watch: {
    reqType(val) {
      this.queryDataByType(val);
      this.tabBtnClick(this.activeTab)
    }
  },
  created() {
    this.queryDataByType(this.reqType);
    this.tabBtnClick(this.activeTab)
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
    padding: 10px;
    transition: width .15s ease-in;
    background: #fff;
    overflow: auto;
    .btn-list {
      .btn-ul {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        .btn-item {
          width: 40%;
          height: 2rem;
          line-height: 2rem;
          cursor: pointer;
          text-align: center;
          margin: 10px 0.5rem;
          border: 1px solid #ccc;
          font-size: 0.75rem;
          border-radius: 5px;
          transition: all .35s linear;
          &:hover,
          &.active {
            border-color: #F45B69;
            background: #F45B69;
            color: #fff;
          }
        }
      }
    }
    .tab-list {
      .tab-btns {
        margin: 1rem 0;
        display: flex;
        justify-content: space-evenly;
        align-items: baseline;
        text-align: center;
        font-size: 0.875rem;
        line-height: 2rem;
        .tab-btn {
          width: 30%;
          padding: 0 0.5rem;
          cursor: pointer;
          &:hover,
          &.active {
            color: #F45B69;
            border-bottom: 2px solid #F45B69;
          }
        }
      }
      .tab-data-list {
        margin-bottom: 20px;
        .data-entry {
          position: relative;
          .entry-title {
            margin: 5px 0;
          }
          .more {
            position: absolute;
            top: 0;
            right: 0;
            color: #999;
            cursor: pointer;
            font-size: 0.5rem;
            padding: 0.2rem 0;
            &:hover {
              color: #333;
            }
          }
          .entry-list {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            .entry-item {
              cursor: pointer;
              padding: 3%; 
              text-align: center;
              &:hover {
                background: #E4FDE1;
              }
              &.small {
                width: 30%;
              }
              &.large {
                width: 45%;
              }
              img {
                display: inline-block;
                width: 100%;
              }
              span{
                display: inline-block;
                width: 100%;
                height: 4rem;
                line-height: 4rem;
              }
              p{
                display: inline-block;
                width: 100%;
                height: 6rem;
              }
            }
          }
        }
      }
    }
  }
  .collapse {
    width: 0!important;
    padding: 0!important;
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