<template>
  <div class="popup-container">
    <div class="popup-window">
      <img class = "LakbayMap" :src = " this.url " alt="">
      <h3 class = "LocationHeader">{{ map_location }}</h3>

    </div>
  </div>
</template>

<script>
export default {
  name: "BeginLakbayPopup",
  props: {
    map_location: {
      type: null,
      required: true,
    },
    url: {
      type: null,
      required: true,
    },

  },
  
};
</script>

<style scoped>
  .popup-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .popup-window {
    text-align: center;
    padding-inline: 1.25vh;
    width: fit-content;
    height: fit-content;
    background: #3c3c3c;
    border-radius: 4vh;
    border: none;
    padding-bottom: 1vh;

  }
  .LakbayMap{
  margin-top: 3.5vh;
  border-radius: 3vw;
  width: 38.6363636vh;
  height: 21.2488889vh;
  object-fit: cover;
  }
  .LocationHeader{
  margin-bottom: 1vh;
  color: #c4c4c4;
  }
</style>
