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
					<p>{{this.landmarkratings}}/5.0</p>
					<p>{{ landmarkinfos.landmark_visits }} have Visited</p>
				</h3>
				<!-- First Para -->
				<p class = "LandmarkPara">{{ this.paragraphOne }}</p>
				<div class = "body">
					<div class = "slider-container">
						<div class = "slide" v-for="(image, index) in 1" :key="index" >
							<img :src="this.randomImage1" alt = "">
							
						</div>
						
					</div>
				</div>
				<p class = "caption">{{ this.randomImage1Cap }}</p>
				<!-- Second Para -->
				<p class = "LandmarkPara">{{ this.paragraphTwo }}</p>
				<div class = "body">
					<div class = "slider-container">
						<div class = "slide" v-for="(image, index) in 1" :key="index" >
							<img :src="this.randomImage2" alt = "">
						</div>
					</div>
				</div>
				<p class = "caption">{{ this.randomImage1Cap }}</p>

				<!-- Third Para -->
				<p class = "LandmarkPara">{{ this.paragraphThree }}</p>

		</main>
		<!-- ------------------------------------------------------------------------------------------ -->
		<footer class = "footer">
			<p class = "LandmarkReviewHeader1">How would you rate this place?</p>
			
			<div style = "display: flex;; justify-content: center;">
				<button
				v-for="(button, index) in reviewButtons"
				:key="index"
				:class="{ 'selected': selectedButton === button }"
				@click="selectButton(button)"
				:style="{ opacity: selectedButton && selectedButton !== button ? '0.5' : '1' }"
				:disabled="!canInputReview"
				>
				{{ button }}
				</button>
			</div>
			<p class = "LandmarkReviewHeader2">Write a review:</p>
			<textarea :disabled="!canInputReview" class = "reviewText" type="text" v-model="textInput" placeholder="Share your thoughts with us!"></textarea>
			
			<p v-if = "reviewNotice1" class = "LandmarkReviewNotice">Seems like you've already reviewed this Landmark! Thanks a lot!</p>
			<p v-if = "reviewNotice2" class = "LandmarkReviewNotice">Awesome! Your review has been saved! Enjoy your Lakbay!</p>

			<button class = "submitButton" :disabled="!(selectedButton && textInput) || !canInputReview" @click="submitReview">Submit</button> 
			<!--  -->
		</footer>
		
	</div>
</template>

<script>
import SidebarToHome from './SidebarToHome.vue';
import axios from 'axios'
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

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
			landmarkratings: '',

			landmarkparagraphs: [],
			paragraphOne: '',
			paragraphTwo: '',
			paragraphThree: '',
			showSidebar: false,
			randomImage1: '',
			randomImage1Cap: '',
			randomImage2: '',
			randomImage2Cap: '',


			reviewButtons: [1, 2, 3, 4, 5],
			selectedButton: null,
			textInput: null,

			canInputReview: true,
			reviewNotice1: false,
			reviewNotice2: false,

			userTokenReview: '',
        	
		}
		},
	mounted() {
		//Authorization
		let userToken = Cookies.get('auth_token');
		this.userTokenReview = userToken;
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

		// This will be used as a major reference for all active api endpoints 
		this.landmark_id = this.$route.params.landmark_id;
		console.log(`Landmark ID: ${this.landmark_id}`);
		



		// Fetch landmark images ------------------------------------------------------------------------------------
		axios.get(`http://localhost:7000/manage/locations/${this.landmark_id}/images`)
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



		// Fetch landmark info NOT paragraphs ------------------------------------------------------------------------------------
		axios.post(`http://localhost:7000/LakbayScan/u/fetching`, {landmarkid: this.landmark_id})
		.then((response) => {
			this.landmarkinfos = response.data[0]
			console.log('fetch landmark info')
			if (this.landmarkinfos) {
				console.log("Test", this.landmarkinfos.landmark_name);
			}
			console.log(response.data)

		}).catch((error) => {
				console.error(error);
				this.error = 'Failed to fetch landmark info.';
		});


		// Fetch landmark ratings -----------------------------------------------------
		axios.post(`http://localhost:7000/LakbayScan/u/fetching/ratings`, {landmarkid: this.landmark_id})
		.then((response) => {
			console.log("Ratings: ",response.data[0].average_rating)
			if (response.data[0].average_rating !== null) { // updated from response.data[0].average_ratings !== null
				this.landmarkratings = parseFloat(response.data[0].average_rating).toFixed(1);
			} else {
				this.landmarkratings = 0.0;
			}
			console.log('fetch landmark ratings: ', this.landmarkratings)
			console.log(response.data)
		}).catch((error) => {
			console.error(error);
			this.error = 'Failed to fetch landmark ratings.';
		});




		// Fetch landmark paragraphs ------------------------------------------------------------------------------------
		axios.post(`http://localhost:7000/LakbayScan/u/fetching/paragraphs`, {landmarkid: this.landmark_id})
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




		// Checks if user has already reviewed the landmark ------------------------------------------------------------------------------------
		axios.post(`http://localhost:7000/LakbayScan/u/reviewlocation/checking`,
			{ landmark_id: this.landmark_id },
			{ headers: { Authorization: `Bearer ${userToken}` } })
		.then((response) => {
			const decoded = jwtDecode(userToken);

			console.log("user ID: ", decoded.data.user_id)
			console.log("landmark ID: ", this.landmark_id)
			console.log(response.data)
			if (response.data.results.length > 0){
				this.canInputReview = !this.canInputReview;
				this.reviewNotice1 = !this.reviewNotice1;
			}
		})
			.catch((error) => {
			console.log(error);
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
		},

		// review feature
		selectButton(button) {
			this.selectedButton = this.selectedButton === button ? null : button;
			console.log('Selected button:', this.selectedButton);
		},
		submitReview() {
			console.log(`Button: ${this.selectedButton}`);
			console.log(`Text: ${this.textInput}`);

			// Check if user has already reviewed the landmark
			axios.post(`http://localhost:7000/LakbayScan/u/reviewlocation`, {
				landmarkid: this.landmark_id,
				reviewrate: this.selectedButton,
				reviewinput: this.textInput,
			}, {
				headers: { Authorization: `Bearer ${this.userTokenReview}` },
			})
			.then((response) => {
				const decoded = jwtDecode(this.userTokenReview);

				console.log(`User ID: ${decoded.data.user_id}`);
				console.log(`Landmark ID: ${this.landmark_id}`);
				console.log(response.data);

				if (response.data.success) {
					this.reviewNotice2 = !this.reviewNotice2;
					this.canInputReview = !this.canInputReview;
				}
			})
			.catch((error) => {
				console.log(error);
			});
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
			font-weight: 500;
			margin-top: 0.5vh;
			margin-bottom: 0.5vh;
		}
		.LandmarkRateVisits{
			display: flex; 
			justify-content: space-between;
			margin-top: -1vh;
			font-size: 4.0vw;
			font-weight: 500;
			color: rgb(65, 65, 65);
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
		.footer{
			margin-inline: 4vw;
			display: flex; 
			flex-direction: column; 
			justify-content: center;
		}
		.LandmarkReviewHeader1{
			display: flex; 
			justify-content: space-between;
			margin-top: 1.5vh;
			font-size: 4.0vw;
			font-weight: 500;
			color: rgb(24, 24, 24);
		}

		button {
			background-color: #c4c4c4;
			font-family: 'Inter';
			border: none;
			border-radius: 10px;
			padding: 10px 20px;
			margin-top: 20px;
			margin: 5px;
			font-size: 16px;
			cursor: pointer;
		}
		.selected {
			background-color: grey;
			color: white;
		}

		.LandmarkReviewHeader2{
			display: flex; 
			justify-content: space-between;
			margin-top: 1.5vh;
			margin-bottom: 0.2vh;
			font-size: 4.0vw;
			font-weight: 500;
			color: rgb(24, 24, 24);
		}

		.reviewText {
			border: none;
			font-family: 'Inter';
			width: 90%;
			margin-top: 1.5vh;
			font-size: 16px;
			padding: 5px;
			align-self: center;
			border-bottom: 10px black;

		}

		.reviewText:focus {
			border: none;
			outline: none; 
		}
		.LandmarkReviewNotice{
			text-align: center;
			margin-top: 1.5vh;
			margin-bottom: 0.2vh;
			font-size: 4.0vw;
			font-weight: 500;
			color: rgb(82, 82, 82);
		}

		.submitButton{
			width: 30%;
			font-family: 'Inter';
			align-self: center;
			margin-top: 1vh;
			margin-bottom: 3.5vh;
		}


	}
</style>



