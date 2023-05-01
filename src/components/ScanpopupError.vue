<template>
  <div class="popup-container">
    <div class="popup-window">
      <h4 style="padding-inline: 10vw; font-size: 2.25vh; font-weight: 500;">Oops, we don't know that QR code!</h4>
      
        <p style="padding-inline: 2vw; font-size: 1.75vh;">
          Looks like it's not in our database. Wanna try another spot or give it another scan?</p>

      <div
        style="
          display: flex;
          justify-content: space-evenly;
          margin-top: 1vh;
          border-top: 1px solid gray;
        "
      >
          <p class="closeButton" v-on:click="closePopup">Close</p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scanpopup",
  
  methods: {
      closePopup() {
          this.$emit("close-popup", "closePopup");
          location.reload();
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
  width: 83vw;
  height: 25vh;
  background: #c4c4c4;
  border-radius: 4vh;
  border: none;
}
</style>
