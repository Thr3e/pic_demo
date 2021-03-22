<template>
  <div id="poster" :style="{background:bgColor}">
    <PosterItem />
  </div>
</template>

<script>
import PosterItem from  './poster-item'
export default {
  name: 'Poster',
  components: {
    PosterItem
  },
  data() {
    return {
      bgColor: '#aaa'
    }
  },
  methods: {
    setBgColor(val) {
      this.bgColor = val;
    }
  }
}
</script>

<style lang="scss" scoped>
#poster {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>