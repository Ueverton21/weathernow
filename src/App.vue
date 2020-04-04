<template>
  <div id="app">
    <nav>
      <h1>Weather Now</h1>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  created(){
    console.log("MENU");
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
