<template>
    <div class="popup-container">
      <div class="popup-window">
        <h3>Landmark Discovered!</h3>
        <h5>Continue to {{ message }}?</h5>
  
        <div
          style="
            display: flex;
            justify-content: space-evenly;
            margin-top: 3vh;
            border-top: 1px solid gray;
          "
        >
            <p class="noButton" v-on:click="closePopup">No</p>
            <p class="yesButton" v-on:click = "reDirectLakbay">Yes</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Scanpopup",
    props: {
      message: {
        type: String,
        required: true,
      },
      landmark_id: {
        type: Number,
        required: true,
      }
    },
    
    methods: {

        reDirectLakbay(){
            console.log(`Redirecting to ${this.landmark_id}`)
            console.log(`Redirecting to ${this.landmark_id}`)
            
            this.$router.push({ name: 'LakbayContent', params: {landmark_id: this.landmark_id} });
        },
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
    width: 75vw;
    height: 20vh;
    background: #c4c4c4;
    border-radius: 4vh;
    border: none;
  }
</style>
  