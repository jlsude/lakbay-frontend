<template>
    <div class = "sidebar">
            <header class = "sidebar-header">
                <div class = "logo-container">
                    <img class="logo" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
                </div>

            </header>
        
            <div class = "labels">
                
                <label class = "label">My Account</label>
                <label class = "label">Dark Mode</label>
                <label class = "label">Settings</label>
                <label class = "label" v-on:click = "logout">Logout</label>

            </div>
        
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {


    methods: {
        showingSidebar(){
                    this.showSidebar = !this.showSidebar;
        },
        logout(){
            console.log('deleting cookie')
            Cookies.remove('auth_token'); 
            this.authToken = ''
            this.$router.push({name: 'Login'});
        }
    }
    
    }


</script>

<style scoped>
    .sidebar{
        display: flex;
        flex-direction: column;

    }
    .labels{
        display: flex;
        flex-direction: column;
        margin-top: 0.5vh;
    }
    .label{
        margin-top: 2vh;
        margin-left: 7.5vw
    }
    .logo-container{

        background: #c9c9c9;
        margin-top: 20vh;
        padding-top: 5vh;
        padding-bottom: 5vh;
        padding-left: 5vw
    }
    .logo{
        display: inline-block;
        text-align: left;
        width: 40vw;
        height: auto;
    }
    

</style>