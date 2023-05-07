<template>
	<div style = "display: flex; flex-direction: column; justify-content: center;">
		<div class="logo-container">
        	<img class="logo" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
		</div>
		
		<div class="qr-container">
			
			<p style = "color: white">{{ decodedQR}}</p>

			<Scanpopup v-if = "showPopup" :message = "this.landmarkinfos.landmark_name" 
				:landmark_id = "this.landmarkinfos.landmark_id"
				v-on:close-popup="closePopupHandler"
			></Scanpopup>

			<ScanpopupError v-if = "showPopupError"></ScanpopupError>

			<div class="overlay" v-if="showPopup"></div>

			<qrcode-stream @init="onInit" @decode="onDecode"  class="QRcode" :stream="stream"></qrcode-stream>
			<button class = "backbutton" v-on:click = "backToHome">Back to Home</button>

		</div>
	</div>
</template>

<script>
import Cookies from 'js-cookie';
import { QrcodeStream } from 'vue3-qrcode-reader';
import axios from 'axios';
import Scanpopup from './Scanpopup.vue';
import ScanpopupError from './ScanpopupError.vue';


export default {
	data(){
		return{
			error: '',
			decodedQR: "",
			stream: null,
			userToken: '',
			landmarkinfos: [],
			qrcodecontent: '',
			showPopup: false,
			showPopupError: false,
			

		}
	},
	components:{
		QrcodeStream, Scanpopup, ScanpopupError },
	mounted() {

		//Authorization
		let userToken = Cookies.get('auth_token');
			if (userToken) {
				axios.get(`http://localhost:7000/home/u/userprofile`, {
				headers: {
					Authorization: `Bearer ${userToken}`
				}
				})
				.then((response) => {
				this.userProfile = response.data[0];
				})
				.catch(error => {
				if (error.response && error.response.status === 401) {
					// Token has expired
					alert('Your session has expired. Please login again.');
					console.log('Session expired, signing out')
					Cookies.remove('auth_token'); 
					this.$router.push({name: 'Login'});
				} else {
					console.log(error);
				}
				});
			} 
			else {
				console.log('clearing cookie')
                Cookies.remove('auth_token'); 
                this.authToken = ''
				this.$router.push({name: 'Login'});
			};

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

			console.log("ERROR: ",this.error)
		},
		onDecode(decodedQR){
			this.qrcodecontent = decodedQR;
			console.log(this.qrcodecontent)
			console.log("onDecode has been initialized")
			if (this.qrcodecontent){ 
				console.log("Axios initializing")
				// endpoint 1
				
				axios.post(`http://localhost:7000/LakbayScan/u/scanning`, {qrcodecontent: this.qrcodecontent}) 
					.then((response) => {
						this.landmarkinfos = response.data[0]
						this.showPopup = !this.showPopup;
						console.log("Scannidadadng ", this.landmarkinfos.landmark_name, this.landmarkinfos.landmark_id)
						console.log("With a visit number of: ", this.landmarkinfos.landmark_visits)
						console.log("Lakbay Content Type: ", this.landmarkinfos.landmark_typecontent)

						//endpoint 2
						let userToken = Cookies.get('auth_token');
						axios.post(`http://localhost:7000/home/u/adduserhistory`,
							{ landmark_id: this.landmarkinfos.landmark_id },
							{ headers: { Authorization: `Bearer ${userToken}` } })
						.then((response) => {
							console.log(response.data)

						})
						.catch((error) => {
							console.error(error);
							this.error = 'Failed to fetch Landmarks.';
						});
					})
					.catch((error) => {
						console.error(error);
						this.error = 'QR not found';
						this.showPopupError = !this.showPopupError;
					});
			} else {
				console.log("Contains empty")
			}
			
		},
		backToHome(){
			console.log('Routing to QR Home')
			this.$router.push({name: 'Home'});
		},
		closePopupHandler(payload) {
			window.location.reload()
			if (payload === "closePopup") {
			this.showPopup = false;
			}
		},


	}
}
</script>

<style scoped>
	@media (max-width: 500px) {
		
	.logo-container {
		margin-top: 10vh;
		max-width: 100%;
		text-align: center;
	}
	.logo {
		margin: auto;
		width: 70%;
		filter: drop-shadow(-9px 14px 48px #000);
	}
	.qr-container{
		display: flex;
		flex-direction: column;
		margin-top: 10vh;
		background: #3C3C3C;
		padding: 10px;
		width: auto;
		justify-content: center;
		border-radius: 5vh;
		object-fit: contain;
		filter: drop-shadow(0px 16px 37px #000);
	
	}
	.QRcode{
		margin-top: 0px;
		width: inherit;
		height: 30vh;
		/* border: 1px dashed red; */
		margin: auto;
		object-fit: cover;
	}
	
	.backbutton{
		border: none;
		
		margin-top: 10vh;
		margin-bottom: 5vh;
		
		align-self: center;
		width: 30vw;
		height: 40px;
		border-radius: 10px;
		background-color: #c4c4c4;

		text-align: center;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 1.5vh;
		line-height: 1.5;
		color: #000000;
	}
    .backbutton:active {
		background-color: #3C3C3C;
	}
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		opacity: 0.5;
		z-index: 500;
		transition: opacity 5s;
	}


	}

	</style>
