<template>
  <h1>Hello, Welcome to Lakbay</h1>
</template>

<script>
export default {
    name: 'Home',
    mounted(){
      let userTokenLocal = localStorage.getItem('usertoken');
      if (userTokenLocal) {
        // Token exists, do something with it
      } else {
        this.$router.push({name: 'Login'})
      }
    }
}

</script>

<style>

</style>