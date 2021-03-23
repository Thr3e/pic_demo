<template>
  <div id="right-operator">
    <p class="title">
      {{etype}}编辑
    </p>
    <div class="form-box">
      <template v-if="etype === '文字'">
        <div class="input-box">
          <label for="value">文本内容</label>
          <input type="text" name="value" id='value'>
        </div>
        <div class="input-box">
          <label for="fontfamily">文字字体</label>
          <input type="text" name="fontfamily" id='fontfamily'>
        </div>
        <div class="input-box">
          <label for="fontsize">文字大小</label>
          <input type="text" name="fontsize" id='fontsize'>
        </div>
        <div class="input-box">
          <label for="color">文字颜色</label>
          <input type="text" name="color" id='color'>
        </div>
      </template>
    </div>
    <div class="confirtm-btn">确定</div>
  </div>
</template>

<script>
export default {
  name: "RightOperator",
  props: {
    etype: {
       type: String,
       default: '文字',
    }
  },
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
    height: 1rem;
    margin: 2rem 0;
    label{
      font-size: 0.825rem;
      margin-right: 5px;
      vertical-align: bottom;
    }
    input {
      display: inline-block;
      width: 70%;
      height: 2rem;
      font-size: 1rem;
      outline: 0;
      padding: 0 10px 0 5px;
      border: 0;
      border-bottom: 1px solid #666;
      &:hover,
      &:focus {
        border-color: #F45B69;
      }
    }
  }
  .confirtm-btn {
    width: 8rem;
    height: 2rem;
    line-height: 2rem;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 0.5rem;
    margin: 3rem auto;
    cursor: pointer;
    &:hover {
      color: #fff;
      border-color: #F45B69;
      background-color: #F45B69;
    }
  }
}
</style>