<template>
  <div class="popup-container">
    <div class="popup-window">
      <img class = "LakbayMap" src="../assets/beginLakbaySample.png" alt="">
      <h3 class = "LocationHeader">Luneta Park</h3>

    </div>
  </div>
</template>

<script>
export default {
  name: "BeginLakbayPopup",
  props: {
    map_id: {
      type: Number,
      required: true,
    }
  },
  mounted(){
    axios.get(`http://localhost:7000/maps/view/${mapid}`)
  },

  methods: {
      closePopup() {
          this.$emit("close-popup", "closePopup");
      }
  }
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
  padding: 0.5vh;
    width: 85vw;
    height: 40vh;
    background: #c4c4c4;
    border-radius: 4vh;
    border: none;
  padding-bottom: 4vh;
  }
  .LakbayMap{
  margin-top: 3.5vh;
  border-radius: 3vw;
  width: 80vw;
  height: 30vh;
  object-fit: cover;
  }
  .LocationHeader{
  margin-bottom: 4vh;
  }
</style>
