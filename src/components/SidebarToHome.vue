<template>
    <div class = "sidebar">
            <header class = "sidebar-header">
                <div class = "logo-container">
                    <img class="logo" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
                </div>

            </header>
        
            <div class = "labels">
                <label class = "label" v-on:click = "home">Home</label>
                <label class = "label" style="opacity: 0.6;">My Account</label>
                <label class = "label" style="opacity: 0.6;">Dark Mode</label>
                <label class = "label" style="opacity: 0.6;">Settings</label>
                <label class = "label" v-on:click = "logout">Logout</label>

            </div>
        
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import landingpage from './landingpage.vue';
export default {
  components: { landingpage },

    methods: {
        showingSidebar(){
                    this.showSidebar = !this.showSidebar;
        },
        logout(){
            console.log('deleting cookie')
            Cookies.remove('auth_token'); 
            this.authToken = ''
            this.$router.push({name: 'Login'});
        },
        home(){
            this.$router.push({name: 'Home'});
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