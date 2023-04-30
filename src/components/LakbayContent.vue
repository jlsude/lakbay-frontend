<template> 
	<div style = "display: flex; flex-direction: column; justify-content: center;">
		<div class = "header-card">
			<header style = "margin-inline: 2.5vw; display: flex; flex-direction: column; justify-content: center; ">
				<div class="Content-header" >
					<div class="sidebar-container">
						<div class="logo-container">
							<img class="logo" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
							<img class="menu" src="../assets/hamburgerMenu.png" v-on:click="showingSidebar">
						</div>
						<div class="sidebar-wrapper" :class="{ active: showSidebar }">
							<div class="sidebar-content">
								<SidebarToHome v-if="showSidebar" />
							</div>
						</div>
						<div class="overlay" v-if="showSidebar" v-on:click="showSidebar = false"></div>
						<img class="menuOverlay" v-if="showSidebar" src="../assets/hamburgerMenu.png" v-on:click="showingSidebar">
					</div>
				</div>
				<div>
					<img class = "scanbutton" src="../assets/ScanButton.png" v-on:click="reDirectScan" alt= "ScanButton">
					<h1 class = "LandmarkNameHeader">{{ landmarkinfos.landmark_name }}</h1>
				</div>
			</header>


		</div>
		<!-- ------------------------------------------------------------------------------------------ -->
		<main class = "ContentMain">
				<!-- Lakbay Image -->
				<div class = "body">
					<div class = "slider-container">
						<div class = "slide" v-for="(image, index) in contentimagedata" :key="index" >
							<img :src="image.url" alt = "">
						</div>
					</div>
				</div>
				<!-- Lakbay Infos -->
				<h1 class = "LandmarkName"> {{ landmarkinfos.landmark_name }}</h1>
				<h2 class = "LandmarkAddress">{{ landmarkinfos.landmark_address }}</h2>
				<h3 class = "LandmarkRateVisits">
					<p>5.0/5.0</p>
					<p>{{ landmarkinfos.landmark_visits }} Have Visited</p>
				</h3>

				<p class = "LandmarkPara">{{ this.paragraphOne }}</p>

				<div class = "body">
					<div class = "slider-container">
						<div class = "slide" v-for="(image, index) in 1" :key="index" >
							<img :src="this.randomImage1" alt = "">
							
						</div>
						
					</div>
				</div>
				<p class = "caption">{{ this.randomImage1Cap }}</p>

				<p class = "LandmarkPara">{{ this.paragraphTwo }}</p>

				<div class = "body">
					<div class = "slider-container">
						<div class = "slide" v-for="(image, index) in 1" :key="index" >
							<img :src="this.randomImage2" alt = "">
						</div>
					</div>
				</div>
				<p class = "caption">{{ this.randomImage1Cap }}</p>
				<p class = "LandmarkPara">{{ this.paragraphThree }}</p>

		</main>
		<!-- ------------------------------------------------------------------------------------------ -->
		
	</div>
</template>

<script>
import SidebarToHome from './SidebarToHome.vue';
import axios from 'axios'
import Cookies from 'js-cookie';

export default {
	name: 'LakbayContent',
	components: {SidebarToHome},
		data(){
		return{
			landmark_id: '',
			contentimagedata: [],

			landmarkinfos: {
				landmark_name: '',
				landmark_city: '',
				landmark_address: '',
				landmark_region: '',
				landmark_coordinates: '',
				landmark_visits: '',
				landmark_typecontent: '',
			},

			landmarkparagraphs: [],
			paragraphOne: '',
			paragraphTwo: '',
			paragraphThree: '',
			showSidebar: false,
			randomImage1: '',
			randomImage1Cap: '',
			randomImage2: '',
			randomImage2Cap: '',
        	
		}
		},
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



		this.landmark_id = this.$route.params.landmark_id;
		console.log(`Landmark ID: ${this.landmark_id}`);
		// fetch landmark_id and display it in the component

		// Fetch landmark images
		axios.get(`http://192.168.1.21:7000/manage/locations/${this.landmark_id}/images`)
        .then((response) => {
			this.contentimagedata = response.data
			console.log(this.contentimagedata)
			//----- Image Randomizer
			let x1, x2, x3 = 0;
			do {
				x1 = Math.floor(Math.random() * this.contentimagedata.length);
				x2 = Math.floor(Math.random() * this.contentimagedata.length);
			} while (x1 === x2 || x1 === x3 || x2 === x3);

				this.randomImage1 = this.contentimagedata[x1].url;
				this.randomImage1Cap = this.contentimagedata[x1].caption;
				this.randomImage2 = this.contentimagedata[x2].url;
				this.randomImage2Cap = this.contentimagedata[x1].caption;
			//------

        }).catch((error) => {
				console.error(error);
				this.error = 'Failed to fetch landmark images.';
		});

		// Fetch landmark info NOT paragraphs
		axios.post(`http://192.168.1.21:7000/LakbayScan/u/fetching`, {landmarkid: this.landmark_id})
		.then((response) => {
			this.landmarkinfos = response.data[0]
			console.log('fetch landmark info')
			if (this.landmarkinfos) {
				console.log("Test", this.landmarkinfos.landmark_name); // problem is here
			}
			console.log(response.data)

		}).catch((error) => {
				console.error(error);
				this.error = 'Failed to fetch landmark info.';
		});

		// Fetch landmark paragraphs
		axios.post(`http://192.168.1.21:7000/LakbayScan/u/fetching/paragraphs`, {landmarkid: this.landmark_id})
		.then((response) => {
			this.landmarkparagraphs = response.data
			console.log(' fetch landmark paragraphs')
			console.log("Paragraph 1", this.landmarkparagraphs[0].info_paragraph)
			this.paragraphOne = this.landmarkparagraphs[0].info_paragraph
			console.log("Paragraph 2", this.landmarkparagraphs[1].info_paragraph)
			this.paragraphTwo = this.landmarkparagraphs[1].info_paragraph
			console.log("Paragraph 3", this.landmarkparagraphs[2].info_paragraph)
			this.paragraphThree = this.landmarkparagraphs[2].info_paragraph
			console.log(response.data)
		}).catch((error) => {
				console.error(error);
				this.error = 'Failed to fetch landmark paragraphs.';
		});


		
	},
	methods: {
		showingSidebar(){
				this.showSidebar = !this.showSidebar;
				console.log("Closing")
			},
		reDirectScan(){
			console.log('Routing to QR Scanner')
			this.$router.push({name: 'QrScanner'});
		}
	}
	}
</script>

<style scoped>
	@media(max-width: 500px){
		.header-card{
			background: #ffffff;
			margin-top: -1vh;
			width: 105%;
			align-self: center;
			border-bottom-left-radius: 9vw;
			border-bottom-right-radius: 9vw;
			box-shadow: 3px 17px 58px -10px rgba(0,0,0,0.4);
			-webkit-box-shadow: 3px 17px 58px -10px rgba(0,0,0,0.4);
			-moz-box-shadow: 3px 17px 58px -10px rgba(0,0,0,0.4);

		}
		.Content-header{
			margin-top: 1vh;
			margin-left: 1.5vw;
			margin-right: 1.5vw;
			
		}
		.logo{
			display: inline-block;
			text-align: left;
			width: 40vw;
			height: auto;
		}
		.menu{
			margin-top: 1vh;
			float: right;
			width: 10vw;
			height: auto;
			cursor: pointer;
		}
		.scanbutton{
			margin: 2vh;
			float: left;
			width: 10vw;
			height: auto;
			cursor: pointer;
		}
		.LandmarkNameHeader{
			margin-top: 1vh;
			margin-left: 18vw;
			margin-right: 5vw;
			padding-top: 1vh;
			padding-bottom: 1vh;
			font-size: 6.5vw;
			border-bottom: 1px solid black;
			
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
			z-index: 9999;
			transition: opacity 5s;
			
		}

		.sidebar-wrapper {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			width: 50%;
			background-color: #fff;
			z-index: 10000;
			transform: translateX(100%);
			transition: transform 0.3s ease-out;
		}

		.sidebar-wrapper.active {
			transform: translateX(0%);
		}
		.menuOverlay{
			position: fixed;
			height: auto;
			margin-top: -5.15vh;
			margin-left: 72vw;
			z-index: 10001;
			width: 10vw;
			cursor: pointer;

			z-index: 10000;
			transform: translateX(100%);
			transition: transform 0.3s ease-out;
		}
		.ContentMain{
			margin-inline: 4vw;
			
		}
		.body{
			margin-top: 3vh;
			display: grid;
			place-items: center;
		}
		.slider-container{
			height: 30vh;
			width: 40vh;
			display: flex;
			overflow: auto;
			scroll-snap-type: x mandatory;
		}
		.slider-container .slide{
			scroll-snap-align: end;
			padding-bottom: 25px;
		}
		.slider-container img{
			width: 40vh;
			height: 100%;
			object-fit: cover;
		}

		.LandmarkName{
			font-size: 6.5vw;
			margin-top: 0.5vh;
			margin-bottom: 0.5vh;

		}
		.LandmarkAddress{
			font-size: 4.5vw;
			font-weight: 600;
			margin-top: 0.5vh;
			margin-bottom: 0.5vh;
		}
		.LandmarkRateVisits{
			display: flex; 
			justify-content: space-between;
			margin-top: -1vh;
			font-size: 4.5vw;
			font-weight: 500;
			color: rgb(30, 30, 30);
		}
		.LandmarkPara{
			margin-bottom: 5vh;
			text-align: justify;
		}
		.caption{
			margin-top: -2vh;
			margin-left: 1.25vw;
			font-size: smaller;
			font-style: italic;
			
			
		}

	}
</style>



