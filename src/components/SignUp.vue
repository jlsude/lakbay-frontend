<template>

    <div>
    <div class="logo-container">
        <img class="logo" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
    </div>
    
    <div class="signup-container">

        <h1 class = "signup-header">Your Lakbay begins here</h1>
        <div class = "signup-styles-container">
            <h1 class = "signup-styles">First Name</h1>
            <input class = "signup-input" v-model = "SignUpInfo.userfirstname" type = "text" placeholder = "Enter First Name"/>

            <h1 class = "signup-styles">Last Name</h1>
            <input class = "signup-input"  v-model = "SignUpInfo.userlastname" type = "text" placeholder = "Enter Last Name"/>

            <h1 class = "signup-styles">Date of Birth</h1>
            <input class = "signup-input"  v-model = "SignUpInfo.userbirthdate" type = "date">

            <h1 class = "signup-styles">City</h1>
            <input class = "signup-input"  v-model = "SignUpInfo.usercity" type = "text" placeholder = "Enter City"/>
        </div>
        <div class = "signup-styles-container2">
            <h1 class = "signup-styles">Email</h1>
            <input class = "signup-input"  v-model = "SignUpInfo.useremail" type = "email" placeholder = "Enter Email"/>

            <h1 class = "signup-styles">Password</h1>
            <input class = "signup-input"  v-model = "SignUpInfo.userpassword" type = "password" placeholder = "Enter Password"/>

            <h1 class = "signup-styles">Confirm Password</h1>
            <input class = "signup-input" v-model = "SignUpInfo.ConfirmPassword" type = "password" placeholder = "Enter Password"/>

            <label class = "accept-terms-conditions">
                <input v-model = "TermsAccepted" type ="checkbox" > Terms and Conditions
            </label>
        </div>

       
        

    </div>
    <footer class = "bottom-header">
        <h1 class = "warning">{{ Warning }}</h1>
        <button v-on:click = "signUp" class = "signupbutton">Sign Up</button>
        <p class = "back-to-login">
         <router-link class = "router-link" to = '/'>Back to the Login page</router-link>
        </p>
    </footer>
    </div>

</template>

<script>
import axios from 'axios'


    export default {
    name: 'SignUp',
    data()
    {
        return{
            SignUpInfo: {
                userfirstname: '',
                userlastname: '',
                userbirthdate: '',
                usercity: '',
                useremail: '',
                userpassword: '',
                ConfirmPassword: ''
            },
            Warning: '',
            TermsAccepted: false,
            message: '',
        }
    },
    methods:{
        signUp(){
            if(this.SignUpInfo.userpassword === this.SignUpInfo.ConfirmPassword 
            && this.SignUpInfo.useremail.includes('@') && this.TermsAccepted === true){
                
                console.log('Signed up')
                this.Warning = "";
                //ip address of the http requests may need to be changes if tested from other device
                axios.post('http://localhost:7000/loginpage/u/login/signup', this.SignUpInfo)
                .then((response) => {
                    console.log(response.data.userId);
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
                console.log("Signed up", this.SignUpInfo)
                this.Warning = "Input error. Please, check your inputs.";
            }
        }
    },
    mounted(){
        
        
    }
    }
</script>

<style scoped>
    @media (max-width: 902px) {

        .logo-container {
            margin-top: -5vh;
            max-width: 100%;
            text-align: center;

        }

        .logo {
            width: 50%;
            margin-bottom: 30px;
        }

        .signup-container {
            /* border: 1px dashed gray; */
            display: flex;
            flex-direction: column;
            text-align: center;
        }


        .signup-header{
            font-family: 'Inter';
            font-style: normal;
            font-style: bold;
            font-size: 5.4vw;
            margin-bottom: 30px;
            line-height: 1.5;
            color: #000000;
        }
        .signup-styles-container{

            margin-left: 12%;
            margin-right: 12%;
            /* border: 1px dashed gray; */
            display: flex;
            flex-direction: column;
            text-align: center;
        }
        .signup-styles-container2{
            margin-top: 50px;
            margin-left: 12%;
            margin-right: 12%;
            /* border: 1px dashed gray; */
            display: flex;
            flex-direction: column;
            text-align: center;
        }
        .signup-styles{
            /* border: 1px dashed gray; */
            text-align: left;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 0.5;
            color: #000000;
        }
        .signup-input{
            width: 90%;
            height: 40px;
            padding-left: 20px;
            display: block;
            margin-bottom: 10px;
            color: #ffffff;
            background-color: #3C3C3C;
        }
        .signup-input[type="date"] {
            text-align: left;
            font-size: 15px;
            color: #ffffff;
        }
        
        .accept-terms-conditions{

            text-align: left;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 0.5;
            color: #000000;
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
        .signupbutton{
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

            text-align: center;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 1.5;
            color: #000000;
        }
        .signupbutton:active {
            background-color: #3C3C3C;
        }

        .back-to-Login, .router-link{
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 1.5;
            color: #000000;
        }


    }

    @font-face {
        font-family: 'Inter';
        src: url('../../public/fonts/Inter-Regular.ttf') format('woff2'),
            url('../../public/fonts/Inter-Regular.ttf') format('woff'),
            url('../../public/fonts/Inter-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
</style>