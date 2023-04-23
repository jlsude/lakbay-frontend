<template>
	<div class="bg-gray-50 px-8">
		<p>{{ error }}</p>
		<p>{{ decodedString }}</p>
		<qrcode-stream @init="onInit" @decode="onDecode" class="QRcode" :stream="stream"></qrcode-stream>

	</div>
</template>

<script>

import { QrcodeStream } from 'vue3-qrcode-reader'

export default {
	data(){
		return{
			error: '',
			decodedString: '',
			stream: null,
		}
	},
	components:{
		QrcodeStream
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
			console.log('hellooooo')
			// window.location.reload()
			// alert('Decoded string: ' + decodedString);
			this.decodedString = ''

		}
	}
}
</script>

<style>
	.QRcode{
		margin-top: 0px;
	}
</style>
