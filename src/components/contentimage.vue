<template>

    <div class = "body">
        <div class = "slider-container">
            <div class = "slide" v-for="(image, index) in imagedata" :key="index" >
                <img :src="image.url" alt = "">
            </div>
        </div>
    </div>
    
</template>
  
<script>
import axios from 'axios'
import { SERVER_ADDRESS } from '../routers';

  export default {
    data() {
      return {
        params: '1',
        imagedata: [],
      }
    },
    mounted() {
      axios.get(`${SERVER_ADDRESS}/manage/locations/${this.params}/images`)
        .then((response) => {
          this.imagedata = response.data
          console.log(this.imagedata)
        })
    }
  }
</script>
<style>
    /* @media (max-width: 500px) {
        

} */
    .body{

        display: grid;
        place-items: center;
    }
    .slider-container{
        height: 500px;
        width: 800px;
        display: flex;
        overflow: auto;
        scroll-snap-type: x mandatory;
    }
    .slider-container .slide{
        scroll-snap-align: end;
        padding-bottom: 50px;
    }
    .slider-container img{
        width: 800px;
        height: 100%;
        object-fit: cover;
        
    }
</style>