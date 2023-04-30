<template>
  <router-view></router-view>
</template>

<script>


export default {
  name: 'App',

}
</script>

<style>
  #app {
    font-family: 'Inter';

  }
  @font-face {
    font-family: 'Inter';
    src: url('../public/fonts/Inter-Regular.ttf') format('woff2'),
        url('../public/fonts/Inter-Regular.ttf') format('woff'),
        url('../public/fonts/Inter-Regular.ttf') format('truetype');
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
  }
</style>
