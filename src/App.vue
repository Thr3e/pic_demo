<template>
  <div id="app">
    <Banner />
    <MainView />
  </div>
</template>

<script>
import MainView from "./components/main-view";
import Banner from "./components/banner";

export default {
  name: "App",
  components: {
    MainView,
    Banner,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #e5e3e4;
  width: 100vw;
  height: 100vh;
}
</style>
