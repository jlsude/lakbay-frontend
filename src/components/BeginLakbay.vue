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
			<h3 class = "beginLakbayHeader">Begin your Lakbay</h3>
			<div style = " display: flex; flex-direction: row; justify-content: center;">
				<input class = "beginLakbayInput"  v-model = "searchInput" type = "text" placeholder = "Search Landmarks"/>
				<button class = "searchButton" v-on:click = "searchMap(searchInput)">
					<img style = "width: 3vh; height: 3vh; display: block; margin: auto;" src="../assets/iconSearch.png" alt="">
				</button>
			</div>
			<p class = "inputLakbayNotice">Enter keywords of a place to search for Lakbay near you.</p>
		</div>
		<div style ="display: flex; flex-direction: column; align-items: center;">
			<div v-for = "map in lakbaymaps" :key = "map.map_id">
				<button class = "LakbayBeginButton" @click = "showBeginLakbay(map)">{{ map.map_location }}</button>

			</div>
			<BeginLakbayPopup v-if = "showMap" :map_location = "lakbaymapchosen.map_location"
					:url = "lakbaymapchosen.url"/>

			<div class="overlay" v-if="showMap" @click="closeBeginLakbay()"></div>
			<div class="fakeoverlay" v-if="showMap" @click="closeBeginLakbay()"></div>
			
				

		</div>
		


	</div>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';
import SidebarToHome from './SidebarToHome.vue';
import BeginLakbayPopup from './BeginLakbayPopup.vue'
import { SERVER_ADDRESS } from '../routers';

	export default {
  		components: { SidebarToHome, BeginLakbayPopup },
		name: 'Home',
		data(){
			return{
			
			lakbaymaps: [],
			searchInput: "",
			showSidebar: false,
			
			showMap: false,
			
			focuslakbaymap: "",
			lakbaymapchosen: {},

			chosenmaplocationname: null,
			chosenimageurl: null,
			
			}
		},

		mounted(){
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


			// if search input is empty launch the get ALL request, must also be in methods not just in mounted
			axios.get(`${SERVER_ADDRESS}/maps/allview`)
			.then((response) => {
				this.lakbaymaps = response.data
				console.log(this.lakbaymaps)
			})
			.catch((error) => {
				console.error(error);
				this.error = 'Failed to fetch maps.';
			});
		},

		methods: {
			showingSidebar(){
				this.showSidebar = !this.showSidebar;
			},
			searchMap(searchInput){
				if (searchInput.length > 0){
					axios.post(`${SERVER_ADDRESS}/maps/search/keywords`, {keywords: this.searchInput})
					.then((response) => {
						console.log(this.searchInput)
						this.lakbaymaps = response.data
						console.log(this.lakbaymaps)
					})
					.catch((error) => {
						console.error(error);
						this.error = 'Failed to fetch maps.';
					});
				} else {
					axios.get(`${SERVER_ADDRESS}/maps/allview`)
					.then((response) => {
						this.lakbaymaps = response.data
						console.log(this.lakbaymaps)
					})
					.catch((error) => {
						console.error(error);
						this.error = 'Failed to fetch maps.';
					});
				}
			},
			showBeginLakbay(map){
				this.showMap = !this.showMap
				console.log(map)
				this.focuslakbaymap = map.map_id
				console.log(this.focuslakbaymap)
				axios.post(`${SERVER_ADDRESS}/maps/get/one`, { mapid : this.focuslakbaymap})
				.then((response) => {
					this.lakbaymapchosen = response.data[0]
					console.log(response.data[0])
					
				})
				.catch((error) => {
					console.log(error);
					this.error = 'Failed to fetch maps.';
				})
				
				
			},
			closeBeginLakbay(){
				this.showMap = !this.showMap
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
			z-index: 500;
			transition: opacity 5s;
			
		}
		.fakeoverlay {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			opacity: 0.0;
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
		.beginLakbayHeader{
			margin-top: 5vh;
			text-align: center;
			font-weight: 600;
		}
		.beginLakbayInput{
            border: none;
			border-radius: 3vw;
            width: 70%;
            height: 40px;
			text-align: center;
			align-self: center;

            color: #ffffff;
            background-color: #3C3C3C;
        }
		.searchButton{
			margin-left: 2vw; 
			width: 5vh; 
			height: 5vh;
			border: none;
			border-radius: 2vw;
			background-color: #c4c4c4;
		}
		.inputLakbayNotice{
			text-align: center;
			padding-inline: 8vw;
			font-style: italic;
			font-size: 3.75vw;

		}
		.LakbayBeginButton {
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
		

		.LakbayBeginButton:active {
				background-color: #3C3C3C;
			}
	}
</style>