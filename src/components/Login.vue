<template>

    <div>
    <div class="logo-container">
        <img class="logo" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
    </div>

    <div class = login-container>
        <h3 class = "login-header">Welcome back to Lakbay</h3>
        <div class = login-styles-container>
            <h1 class = "login-styles">Email</h1>
            <input class = "login-input"  v-model = "LoginInfo.useremail" type = "email" placeholder = "Enter Email"/>
            <h1 class = "login-styles">Password</h1>
            <input class = "login-input"  v-model = "LoginInfo.userpassword" type = "password" placeholder = "Enter Password"/>

        </div>
    </div>

    <footer class = "bottom-header">
        <h1 class = "warning">{{ Warning }}</h1>
        <button v-on:click = "login" class = "loginbutton">Login</button>
        <p class = "New-to-Lakbay">
            New to Lakbay? <router-link  class = "router-link" to = '/sign-up'> Sign up</router-link>
        </p>
        
    </footer>
    </div>

</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import { SERVER_ADDRESS } from '../routers';


export default {
    name: 'Login',
    data() {
        return {

            LoginInfo: {
                useremail: "",
                userpassword: ""
            },
            Warning: " ",
            userToken: " ",
            authToken: '',


        };
    },
    mounted(){
        console.log('clearing cookie')
        Cookies.remove('auth_token'); 
        this.authToken = ''

        

    },
    methods: {
        login(){
            console.log(SERVER_ADDRESS)
            if(this.LoginInfo.useremail && this.LoginInfo.userpassword){
                this.Warning = "",
                //ip address of the http requests may need to be changed if tested from other device http://localhost:7000
                axios.post(`${SERVER_ADDRESS}/loginpage/u/login`, this.LoginInfo)
                .then((response) => {
                    this.Warning = "Login Successful";
                    const userToken = response.data.token;
                    console.log(response.data.token)

                    const decoded = jwt_decode(userToken);
                    console.log(decoded.data.user_id) // the user id of the user who logins

                    console.log(response.status)
                    if(response.status==200){
                        Cookies.set('auth_token', userToken);
                        console.log("routing")
                        this.$router.push({name: 'Home'})
                    }

                })
                .catch(error => {
                    if (error.response) {
                        console.log(error.response.data.message); // this will log "Invalid email or password."
                        this.Warning = error.response.data.message;
                    } else {
                        console.log(error.message);
                    }
                });
                
            }
            else{
                this.Warning = "Check your inputs",
                console.log("no input")
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
            width: 50%;
            margin-bottom: 30px;
        }
        .login-container {
            /* border: 1px dashed gray; */
            display: flex;
            flex-direction: column;
            text-align: center;
        }
        .login-header{
            /* border: 1px dashed gray; */
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500px;
            font-size: 6.7vw;
            margin-bottom: 70px;
            line-height: 1.5;
            color: #000000;
        }
        .login-styles-container{
            margin-top: 60px;
            margin-left: 12%;
            margin-right: 12%;
            /* border: 1px dashed gray; */
            display: flex;
            flex-direction: column;
            text-align: center;
        }
        .login-styles{

            /* border: 1px dashed gray; */
            text-align: left;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 0.5;
            color: #000000;
        }
        .login-input{
            border: none;
			border-radius: 3vw;
            width: 90%;
            height: 40px;
            padding-left: 20px;
            display: block;
            margin-bottom: 20px;
            color: #ffffff;
            background-color: #3C3C3C;
        }
        .bottom-header{
            text-align: center;
        }
        .warning{
            text-align: center;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 1.5;
            color:red
        }
        .loginbutton{
            border: none;
            margin-top: 30px;
            margin-left: 50px;
            margin-right: 50px;
            margin-bottom: 20px;
            align-self: center;
            width: 25%;
            height: 40px;
            border-radius: 10px;
            background-color: #c4c4c4;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 1.5;
            color: #000000;
        }
        .loginbutton:active {
            background-color: #3C3C3C;
        }
        .New-to-Lakbay, .router-link{
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 1.5;
            color: #000000;
        }

        @font-face {
            font-family: 'Inter';
            src: url('../../public/fonts/Inter-Regular.ttf') format('woff2'),
                url('../../public/fonts/Inter-Regular.ttf') format('woff'),
                url('../../public/fonts/Inter-Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
        }
    }
</style>