<template>
    <div>
      <h1>Camera Component</h1>
      <div>
        <video ref="videoElement" autoplay></video>
      </div>
      <div>
        <button v-if="!stream" @click="startCamera">Start Camera</button>
        <button v-if="stream" @click="stopCamera">Stop Camera</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        stream: null,
        videoElement: null
      };
    },
    mounted() {
      this.videoElement = this.$refs.videoElement;
    },
    methods: {
      startCamera() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error('getUserMedia is not supported');
          return;
        }
  
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            this.stream = stream;
            this.videoElement.srcObject = stream;
            this.videoElement.play();
          })
          .catch(error => {
            console.error('getUserMedia error:', error);
          });
      },
      stopCamera() {
        if (this.stream) {
          this.stream.getTracks().forEach(track => track.stop());
          this.stream = null;
          this.videoElement.srcObject = null;
        }
      }
    }
  };
  </script>
  