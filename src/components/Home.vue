<template>
	<div style = "display: flex; flex-direction: column; justify-content: center;">
		<header class="home-header">
			<div class="sidebar-container">
				<div class="logo-container">
					<img class="logo" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
					<img class="menu" src="../assets/hamburgerMenu.png" v-on:click="showingSidebar">
				</div>
				<div class="sidebar-wrapper" :class="{ active: showSidebar }">
					<div class="sidebar-content">
						<Sidebar v-if="showSidebar" />
					</div>
				</div>
				<div class="overlay" v-if="showSidebar" v-on:click="showingSidebar"></div>
				<img class="menuOverlay" v-if="showSidebar" src="../assets/hamburgerMenu.png" v-on:click="showingSidebar">
			</div>
		</header>
		<div class = "qrdiv">
			
			<button class = "qrbutton" v-on:click = "QRscanner">QR-Scanner</button>
			<button class = "beginLakbay" v-on:click = "beginLakbay" >Begin your Lakbay</button>
			<h1 class = "recentLakbay">Your Recent Lakbay</h1>

			<!-- To be concised -->
			<div v-for = "userhistory in userhistory" :key = "userhistory.userhistory_id">
				<button class = "LakbayRecent" v-on:click = "reDirectLakbay(userhistory)" v-if = "!showRecentLakbay">{{ userhistory.landmark_name }}</button>
			</div>
			<div v-for="i in 2" :key="i">
				<button class = "LakbayRecentDataInsuficient" v-if = "showRecentLakbay">Data insuficient</button>
			</div>
			<!-- -------- -->
			<h1 class = "LakbayBucketListHeader">Lakbay Bucket List</h1>
			<div class = "footer-container">
				<div class = "footer-section" v-for="BucketList in BucketLists" :key="BucketList.bucketlist_id">
					<button class = "BucketListButton" v-on:click = "reDirectBucketList(BucketList)" v-if = "!showBucketLists">{{ BucketList.bucketlist_name }}</button>
				</div>
				<div class = "footer-section" v-for="i in 3" :key="i">
					<button class = "BucketListButtonFalse" v-if = "showBucketLists">Data insuficient</button>
				</div>
			</div>
			
		</div>
		
	</div>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';
import Sidebar from './Sidebar.vue';

	export default {
  		components: { Sidebar },
		name: 'Home',
		data(){
			return{
			userProfile: {
				user_email: "",
				user_password: "",
				user_firstname: "",
				user_lastname: "",
			},
			userToken: "",
			users: [],
			userhistory: [],
			BucketLists: [],

			showSidebar: false,
			showRecentLakbay: false,
			showBucketLists: false,

			}
		},

		mounted(){
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

			
			//Recent Lakbay - focus on recent lakbay
			axios.get(`http://192.168.1.21:7000/home/u/userhistory`, {
				headers: { Authorization: `Bearer ${userToken}`}})
			.then((response) => {
				this.userhistory = response.data.slice(-2);
				console.log('Recent Lakbay data', this.userhistory);

				if (this.userhistory.length < 2) {
					this.showRecentLakbay = !this.showRecentLakbay;
					console.log('Recent Lakbay data insuficient', this.userhistory);
					
				} else {
					
      				console.log("Recent Lakbay");
				}
			})
			.catch((error) => {
				console.error(error);
				this.error = 'Failed to fetch Landmarks.';
			});

			//Bucketlist ----------------------------------------------
			axios.get(`http://localhost:7000/bucketlist/allview`)
			.then((response) => {
				this.BucketLists = response.data.slice(-3);
				console.log('BucketLists', this.BucketLists);

				if (this.BucketLists.length < 1) {
					this.showBucketLists = !this.showBucketLists;
					console.log('Buckelists data insuficient', this.BucketLists);
					
				} else {
					
      				console.log("Buckelists greater than 3");
				}
			})
			.catch((error) => {
				console.error(error);
				this.error = 'Failed to fetch Landmarks.';
			});

		
		},

		methods: {
			
			QRscanner(){
				console.log('Routing to QR Scanner')
				this.$router.push({name: 'QrScanner'});
			},
			showingSidebar(){
				this.showSidebar = !this.showSidebar;
				
			},
			beginLakbay(){
				console.log('Routing to Begin Lakbay')
				this.$router.push({name: 'BeginLakbay'});
			},
			reDirectLakbay(userhistory){
				console.log(`Redirecting to ${userhistory.landmark_name}`)
				console.log(`Redirecting to ${userhistory.landmark_id}`)
				this.$router.push({ name: 'LakbayContent', params: {landmark_id: userhistory.landmark_id} });
			},
			reDirectBucketList(BucketList){
				console.log(`Redirecting to ${BucketList.bucketlist_name}`)
				console.log(`Redirecting to ${BucketList.bucketlist_id}`)
				this.$router.push({ name: 'BucketList', params: {bucketlist_id: BucketList.bucketlist_id} });
			}
		}
	}

		
	

</script>

<style scoped>
	@media (max-width: 500px) {
		#Home{
			font-family: 'Inter';
		}
		.home-header {
			/* border: 1px dashed rgb(148, 19, 19); */

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
		.qrdiv{
			display: flex;
			flex-direction: column;
			text-align: center;
			
		}
		.qrbutton{
			border: none;
			padding: 18vh;
			margin-top: 5vh;
			align-self: center;
			width: 25%;
			height: 40px;
			border-radius: 5vh;
			background-color: #c4c4c4;


			font-family: 'Inter';
			font-style: normal;
			font-weight: 400;
			font-size: 15px;
			line-height: 1.5;
			color: #000000;
		}
		.beginLakbay{
			border: none;
			margin-top: 4vh;
			align-self: center;
			width: 20vh;
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
		.recentLakbay{
			font-size: 2.5vh; 
			font-weight: 400;
			text-align: left; 
			margin-left: 8vw; 
			margin-right: 8vw;
			margin-top: 3vh;
			margin-bottom: 0.2vh
		}
		.LakbayRecent {
			border: none;
			align-self: center;
			width: 80vw;
			height: 6vh;
			border-radius: 1.4vh;
			margin-top: 1vh;
			background-color: #c4c4c4;

			text-align: center;
			font-family: 'Inter';
			font-style: normal;
			font-weight: 400;
			font-size: calc(0.5em + 3vw);
			line-height: 1.5;
			word-wrap: break-word;
			text-overflow: ellipsis;
		}
		.LakbayRecentDataInsuficient{
			border: none;
			align-self: center;
			width: 80vw;
			height: 6vh;
			border-radius: 1.4vh;
			margin-top: 1vh;
			background-color: #c4c4c4;

			opacity: 0.4;
			text-align: center;
			font-family: 'Inter';
			font-style: normal;
			font-weight: 400;
			font-size: calc(0.5em + 3vw);
			line-height: 1.5;
			word-wrap: break-word;
			overflow-wrap: break-word;
		}
		.LakbayBucketListHeader{
			font-size: 2.5vh; 
			font-weight: 400;
			text-align: center; 
			margin-left: 5vw; 
			margin-right: 5vw;
			margin-top: 3vh;
			margin-bottom: 0.2vh
		}
		.footer-container{
			overflow-x: scroll;
			scroll-snap-type: x mandatory;
			display: flex;
		}
		.footer-section{
			scroll-snap-align: start;
			scroll-snap-stop: always;
			padding-bottom: 10px;
		}
		.BucketListButton{
			margin-left: 7.5vw;
			margin-right: 8vw;
			border: none;
			align-self: center;
			width: 80vw;
			height: 6vh;
			border-radius: 1.4vh;
			margin-top: 1vh;
			background-color: #c4c4c4;

			text-align: center;
			font-family: 'Inter';
			font-style: normal;
			font-weight: 400;
			font-size: calc(0.5em + 3vw);
			line-height: 1.5;
			word-wrap: break-word;
			overflow-wrap: break-word;
		}
		.BucketListButtonFalse{
			margin-left: 7.5vw;
			margin-right: 8vw;
			border: none;
			align-self: center;
			width: 80vw;
			height: 6vh;
			border-radius: 1.4vh;
			margin-top: 1vh;
			background-color: #c4c4c4;

			opacity: 0.4;
			text-align: center;
			font-family: 'Inter';
			font-style: normal;
			font-weight: 400;
			font-size: calc(0.5em + 3vw);
			line-height: 1.5;
			word-wrap: break-word;
			overflow-wrap: break-word;
		}




		.beginLakbay:active, .logoutbutton:active,
		.LakbayRecent:active, .BucketListButton:active {
				background-color: #3C3C3C;
			}
	}
</style>