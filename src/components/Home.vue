<template>
	<div style = "display: flex; flex-direction: column;">
		<header class = "home-header">
			<div class="logo-container">
				<img class="logo" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
				<img class = "menu" src = "../assets/hamburgerMenu.png" alt = "Menu burger">
			</div>
			
		</header>
		<div class = "qrdiv">
			<button class = "qrbutton" v-on:click = "QRscanner">QR-Scanner</button>
			<button class = "beginLakbay" v-on:click = "beginLakbay" >Begin your Lakbay</button>
			<h1 class = "recentLakbay">Your Recent Lakbay</h1>
			<button class = "LakbayRecent" >{{ LakbayRecent}}</button>
			<button class = "LakbayRecent" >{{ LakbayRecent}}</button>
			
		</div>
		<footer class = "home-footer">
			<button class = "logoutbutton" v-on:click = "logout">Logout</button>
		</footer>
	</div>
</template>

<script>
import Cookies from 'js-cookie'
import axios from 'axios'

	export default {
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
			LakbayRecent: "Casa Manila",

			}
		},
		mounted(){
			let userToken = Cookies.get('auth_token');
			if (userToken) {
				axios.get(`http://192.168.1.12:7000/home/u/userprofile`, {
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
			} else {
				
				console.log('clearing cookie')
                Cookies.remove('auth_token'); 
                this.authToken = ''
				this.$router.push({name: 'Login'});
			}
		},
		methods: {
			logout(){
				console.log('deleting cookie')
                Cookies.remove('auth_token'); 
                this.authToken = ''
				this.$router.push({name: 'Login'});
			},
			QRscanner(){
				
				console.log('Routing to QR Scanner')
				this.$router.push({name: 'QrScanner'});
				
				
				
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
			margin-top: -5vh;
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
			border: 1px dashed gray;
			font-size: 2.5vh; 
			font-weight: 400;
			text-align: left; 
			margin-left: 5vw; 
			margin-right: 5vw;
			margin-top: 3vh;
			margin-bottom: 0.2vh
		}
		.LakbayRecent{
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
			font-size: 1.5em;
			line-height: 1.5;
			color: #000000
		}
		.logoutbutton{
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
		.beginLakbay:active, .logoutbutton:active,
		.LakbayRecent:active {
				background-color: #3C3C3C;
			}
	}
</style>