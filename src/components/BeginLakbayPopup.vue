<template>
    <div class="popup-container">
      <div class="popup-window">
        <h3>Landmark Discovered!</h3>
        <h5>Continue to {{ message }}?</h5>

        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BeginLakbayPopup",
    props: {
      bucketlist_id: {
        type: Number,
        required: true,
      }
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
    width: 75vw;
    height: 20vh;
    background: #c4c4c4;
    border-radius: 4vh;
    border: none;
  }
  </style>
  