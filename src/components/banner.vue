<template>
  <div id="banner" class="clearfix">
    <div class="logo fl"></div>
    <div class="right-buttons fl">
      <div class="btn">
        <p class="btn-title">导入</p>
      </div>
      <div class="btn">
        <p class="btn-title">图库</p>
      </div>
      <div class="btn">
        <p class="btn-title">下载</p>
      </div>
      <div class="btn">
        <p class="btn-title">更多</p>
      </div>
      <div class="btn normal-btn">
        <p class="iconfont btn-title undo">&#xe738;</p>
      </div>
      <div class="btn normal-btn">
        <p class="iconfont btn-title redo">&#xe738;</p>
      </div>
      <div class="btn">
        <p class="btn-title">
          <i class="iconfont" style="font-style: normal">&#xe6b2;</i>
          保存
        </p>
      </div>
    </div>
    <div class="left-buttons fr">
      <div class="btn normal-btn">
        <p class="btn-title">
          <i class="iconfont" style="font-style: normal">&#xe6b2;</i>
          预览
        </p>
      </div>
      <div class="btn long-btn">
        <p class="btn-title">
          <i class="iconfont" style="font-style: normal">&#xe6b2;</i>
          无水印下载
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
};
</script>

<style>
#banner {
  width: 100%;
  height: 4rem;
  background: #fff;
  box-shadow: 0 1px 4px hsl(0deg 0% 88% / 50%);
}
.logo {
  width: 10rem;
  height: 100%;
  background-image: url("../assets/imgs/logo.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
  background-color: #456990;
}
.right-buttons,
.left-buttons {
  height: 100%;
  display: flex;
  align-items: center;
}
.right-buttons {
  width: 40%;
  justify-content: flex-start;
}
.left-buttons {
  width: 20%;
  justify-content: flex-end;
}
.left-buttons .long-btn {
  width: 9rem;
  color: #fff;
}
.left-buttons .long-btn:hover {
  color: #6b2737;
}
.left-buttons .long-btn::before {
  height: 100%;
  transition: none;
}
.normal-btn:hover {
  color: #f45b69!important;
}
.normal-btn::before {
  display: none!important;
}
.btn {
  width: 6rem;
  height: 100%;
  line-height: 4rem;
  text-align: center;
  cursor: pointer;
  color: #666;
  position: relative;
  transition: all 0.25s ease-in-out;
}

.btn::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  background: #f45b69;
  transition: all 0.25s ease-in-out;
}

.btn:hover {
  color: #fff;
}

.btn:hover::before {
  height: 100%;
}

.btn-title {
  position: relative;
  z-index: 1;
}

.btn .redo {
  transform: rotateY(180deg);
}

.btn .undo,
.btn .redo {
  font-size: 1.25rem;
}
</style>