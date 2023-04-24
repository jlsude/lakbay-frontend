<template>
	<div>
		<h1>Hello, Welcome to Lakbay</h1>
		<button class = "logoutbutton" v-on:click = "QRscanner">QR Scanner</button>
		<h1>Hello, {{ this.userProfile.user_email }}</h1>
		<h1>Hello, {{ userProfile.user_firstname }}</h1>
		<h1>he, {{ this.userProfile.user_lastname }}</h1>
		<button class = "logoutbutton" v-on:click = "logout">Logout</button>
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

<style>
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
    .logoutbutton:active {
            background-color: #3C3C3C;
        }
</style>