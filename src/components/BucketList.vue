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
						<SidebarToHome v-if="showSidebar" />
					</div>
				</div>
				<div class="overlay" v-if="showSidebar" v-on:click="showingSidebar"></div>
				<img class="menuOverlay" v-if="showSidebar" src="../assets/hamburgerMenu.png" v-on:click="showingSidebar">
			</div>
		</header>
		<div style ="display: flex; flex-direction: column; justify-content: center; text-align: center;">
			<h3 class = "BucketListHeader">Lakbay Bucket List:</h3>
			<h2 class = "BucketListNameHeader">{{this.BucketList.bucketlist_name}}</h2>
			<img class = "BucketListImage" :src = "this.BucketList.url" alt="">
			
			<p class = "BucketListIntro">{{ this.BucketList.bucketlist_intro }}</p>
		</div>
		<div style ="display: flex; flex-direction: column; align-items: center;">
			<div v-for = "locations in bucketlistlocations" :key = "locations.landmark_id">
				<button class = "BucketlistLocation">{{locations.landmark_name}}</button>
			</div>
		</div>
		


	</div>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';
import SidebarToHome from './SidebarToHome.vue';
import { SERVER_ADDRESS } from '../routers';

	export default {
  		components: { SidebarToHome },
		name: 'Home',
		data(){
			return{
			bucketlist_id: '',
			searchInput: "",
			showSidebar: false,

			BucketList: [],
			bucketlistlocations: [],
			
			}
		},

		mounted(){

			this.bucketlist_id = this.$route.params.bucketlist_id;

			//Authorization
			let userToken = Cookies.get('auth_token');
			if (userToken) {
				axios.get(`${SERVER_ADDRESS}/home/u/userprofile`, 
				{ headers: { Authorization: `Bearer ${userToken}`} })
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
			} else {
				console.log('clearing cookie')
                Cookies.remove('auth_token'); 
                this.authToken = ''
				this.$router.push({name: 'Login'});
			};

			
			// Fetch Bucketlist------------------------------------------------------------------------------------
			axios.get(`${SERVER_ADDRESS}/bucketlist/view/${this.bucketlist_id}`)
			.then((response) => {
				this.BucketList = response.data[0]
				console.log(this.BucketList)
				console.log('Name of bucketlist', this.BucketList.bucketlist_name)

				
				

			}).catch((error) => {
					console.error(error);
					this.error = 'Failed to fetch bucket list data.';
			});

			// Fetch Bucketlist location -----------------------------------------
			axios.get(`${SERVER_ADDRESS}/bucketlist/view/locations/${this.bucketlist_id}`)
			.then((response) => {
				this.bucketlistlocations = response.data
				console.log(this.bucketlistlocations)
				

				
				

			}).catch((error) => {
					console.error(error);
					this.error = 'Failed to fetch bucket list data.';
			});


		
		},

		methods: {
			showingSidebar(){
				this.showSidebar = !this.showSidebar;

			},
			reDirectBeginLakbay(map){
				
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
		.BucketListHeader{
			margin-top: 5vh;
			text-align: center;
			font-size: 4.5vw;
			font-weight: 600;
			margin-bottom: 1vh;
		}
		.BucketListNameHeader{
			margin-top: 2vh;
			text-align: center;
			font-weight: 600;
		}
		.BucketListImage{
			width: 80%;
			height: 40%;
			align-self: center;
			object-fit: cover;
		}
		.BucketListIntro{
			text-align: justify;
			padding-inline: 8vw;

			font-size: 3.75vw;

		}
		.BucketlistLocation {
			border: none;
			width: 80vw;
			height: 6.75vh;
			border-radius: 1.4vh;
			margin-top: 2vh;
			background-color: #c4c4c4;
			padding: 2.5px;


			text-align: center;
			font-family: 'Inter';
			font-style: normal;
			font-weight: 400;
			font-size: calc(0.5em + 4vw);
			line-height: 1;
			font-size: 5.5vw;

			overflow: hidden;
			text-overflow: ellipsis;
		}


		.BucketListButton:active {
				background-color: #3C3C3C;
			}
	}
</style>