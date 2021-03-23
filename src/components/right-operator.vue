<template>
  <div id="right-operator">
    <p class="title" v-if="eType">
      {{typeList[eType].label}}编辑
    </p>
    <div class="form-box">
      <template v-if="eType === 'text'">
        <div class="input-box">
          <label for="value">文本内容</label>
          <input type="text" name="value" id='value' v-model="typeList[eType].data.text">
        </div>
        <div class="input-box">
          <label for="fontfamily">文字字体</label>
          <select name="fontfamily" id='fontfamily' v-model="typeList[eType].data.fontFamily">
            <option value = 'Monoton'>Monoton</option>
            <option value = 'simhei'>simhei</option>
            <option value = 'simkai'>simkai</option>
            <option value = 'pang'>pang</option>
            <option value = 'light'>light</option>
            <option value = 'cang'>cang</option>
            <option value = 'Desolator'>Desolator</option>
          </select>
        </div>
        <div class="input-box">
          <label for="fontsize">文字大小</label>
          <input type="text" name="fontsize" id='fontsize' v-model="typeList[eType].data.fontSize">
          <!-- <span class="input-after">px</span> -->
        </div>
        <div class="input-box">
          <label for="color">文字颜色</label>
          <input type="text" name="color" id='color' v-model="typeList[eType].data.textFill">
          <!-- <span class="input-before">#</span> -->
        </div>
      </template>
      <template v-else-if="eType === 'meta'">
        <div class="input-box">
          <label for="metaSize">素材尺寸</label>
          <input type="text" name="metaSize" id='metaSize' v-model="typeList[eType].data.size">
          <!-- <span class="input-after">px</span> -->
        </div>
      </template>
      <template v-else-if="eType === 'back'">
        <div class="input-box">
          <label for="backColor">背景颜色</label>
          <input type="text" name="backColor" id='backColor' v-model="typeList[eType].data.color">
          <!-- <span class="input-before">#</span> -->
        </div>
      </template>
      <template v-else>
        <div class="no-data"></div>
      </template>
    </div>
    <template v-if="eType">
      <div class="confirtm-btn func-btn" @click="confirm()">确&nbsp;&nbsp;&nbsp;&nbsp;定</div>
      <div v-if="eType !== 'back'" class="delete-btn func-btn" @click="deleteItem()">删除元素</div>
    </template>
  </div>
</template>

<script>
import Bus from '../service/eventBus'
export default {
  name: "RightOperator",
  data() {
    return {
      fontFamilyList: [
        'Monoton',
        'simhei',
        'simkai',
        'pang',
        'light',
        'cang',
        'Desolator',
      ],
      eType: 'text',
      typeList: {
        'text': {
          label: '文字',
          data: {}
        },
        'meta': {
          label: '素材',
          data: {}
        },
        'back': {
          label: '背景',
          data: {}
        },
      },
    }
  },
  created() {
    Bus.$on('activeItem', target => {
      this.eType = target.type;
      this.typeList[target.type].data = target.data;
    });  
  },
  methods: {
    confirm() {
      Bus.$emit('change-' + this.eType, this.typeList[this.eType].data)
    },
    deleteItem() {
      Bus.$emit('deleteItem')
      this.eType = '';
      this.typeList[target.type].data = {}
    }
  }
};
</script>

<style lang="scss" scoped>
#right-operator {
  width: 100%;
  padding: 1rem;
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 1px solid #aaa;
  }
  .input-box {
    width: 100%;
    height: 2rem;
    margin: 2rem 0;
    position: relative;
    .input-after,
    .input-before {
      position: absolute;
      top: 50%;
      color:#aaa;
      font-size: .825rem;
      transform: translateY(-50%);
      &.input-after {
        right: 20px;
      }
      &.input-before {
        left: 30%;
      }
    }
    label{
      font-size: 0.825rem;
      margin-right: 5px;
      vertical-align: bottom;
    }
    input,
    select {
      display: inline-block;
      width: 70%;
      height: 100%;
      font-size: 1rem;
      outline: 0;
      padding: 0 2rem 0 0.5rem;
      border: 0;
      border-bottom: 1px solid #999;
      &:hover,
      &:focus {
        border-color: #F45B69;
      }
    }
  }
  .func-btn {
    width: 8rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 0.5rem;
    margin: 1rem auto 0;
    user-select: none;
    &.confirtm-btn {
      color: #fff;
      border-color: #F45B69;
      background-color: #F45B69;
      cursor: pointer;
    }
    &.delete-btn {
      border: 1px solid #ccc;
      cursor: pointer;
      &:hover {
        color: #fff;
        border-color: #F45B69;
        background-color: #F45B69;
      }
    }

  }
}
</style>
