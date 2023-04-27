<template>
	<div class="qr-container">
		<p>{{ error }}</p>
		<p style = "color: white">{{ decodedString }}</p>
		<qrcode-stream @init="onInit" @decode="onDecode" class="QRcode" :stream="stream"></qrcode-stream>
		<button class = "backbutton" v-on:click = "backToHome">Back</button>
	</div>
</template>

<script>
import Cookies from 'js-cookie'
import { QrcodeStream } from 'vue3-qrcode-reader'

export default {
	data(){
		return{
			error: '',
			decodedString: '',
			stream: null,
			userToken: '',
		}
	},
	components:{
		QrcodeStream
	},
	mounted() {
		let userToken = Cookies.get('auth_token')
		if (userToken) {
			console.log('user has token')
		} else{
			console.log('user has no token')
		}
	},
	methods: {
		
		async onInit(promise) {
			
		    try {
			const { capabilities } = await promise;

			// get the list of available devices
			const devices = await navigator.mediaDevices.enumerateDevices();

			// find the first video device
			const videoDevice = devices.find(device => device.kind === 'videoinput');

			// create a MediaStream using the selected video device
			this.stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: videoDevice.deviceId } });

			} catch (error) {

				console.log(error)
				if (error.name === 'NotAllowedError') {
					this.error = "user denied camera access permission"
				} else if (error.name === 'NotFoundError') {
					this.error = "no suitable camera device installed"
				} else if (error.name === 'NotSupportedError') {
					this.error = "page is not served over HTTPS (or localhost)"
				} else if (error.name === 'NotReadableError') {
					this.error = "maybe camera is already in use"
				} else if (error.name === 'OverconstrainedError') {
					this.error = "did you request the front camera although there is none?"
				} else if (error.name === 'StreamApiNotSupportedError') {
					this.error = "browser seems to be lacking features"
				}
			} finally {
				// hide loading indicator
			}
		},
		onDecode(decodedString){
			this.decodedString = decodedString;
			console.log('hellooooo', decodedString )

			// window.location.reload()
			// alert('Decoded string: ' + decodedString);
			// this.decodedString = ''

		},
		backToHome(){
			console.log('Routing to QR Home')
			this.$router.push({name: 'Home'});
		},

	}
}
</script>

<style scoped>
	.qr-container{
		margin-top: 27vh;
		background: #3C3C3C;
		padding: 10px;
		width: auto;
		align-items: center;
		text-align: center;

		

		
	}
	.QRcode{
		margin-top: 0px;
		width: 40vh;
		
		
	}
	
	.backbutton{
		border: none;
		margin: 50px;
		align-self: center;
		width: 25%;
		height: 40px;
		border-radius: 10px;
		background-color: #c4c4c4;

		text-align: center;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 15px;
		line-height: 1.5;
		color: #000000;
	}
    .backbutton:active {
		background-color: #3C3C3C;
	}



	</style>
