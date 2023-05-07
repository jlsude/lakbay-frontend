<template>
    <div>
        <div style = "display: flex; flex-direction: column; 
            justify-content: center; text-align: center;  
            gap: 5vh; margin-top: 20vh;">
            
            <div class="logo-container" >
            <img class="logo" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
            </div>
            <div style = "display: flex; flex-direction: column; justify-content: center; filter: drop-shadow(0px 21px 32px #000);" >
                <h4 style = "margin: auto;">Hello dear traveler, welcome to Lakbay</h4>
                <h4 style = "margin-bottom: auto; margin-inline: 3vw;">
                    Login with your Lakbay account to unveil the hidden narratives of the world with Lakbay
                </h4>
            </div>
            <div style = "display: flex; flex-direction: row; justify-content: center; gap: 1rem;">
                <button v-on:click = "login" class = "button">Login</button>
                <button v-on:click = "signUp" class = "button">Sign up</button>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        login(){
            this.$router.push({name: 'Login'})
        },
        signUp(){
            this.$router.push({name: 'SignUp'})
        }
    }
}
</script>

<style scoped>
    @media (max-width: 500px) {
        .shadow{
            filter: drop-shadow(-9px 14px 48px #000);
        }
        
        .logo-container {
            margin-top: 10vh;
            max-width: 100%;
            text-align: center;
        }
        .logo {
            width: 50%;
            margin-bottom: 30px;
            filter: drop-shadow(0px 21px 32px #000);
        }
        .login-container {
            /* border: 1px dashed gray; */
            display: flex;
            flex-direction: column;
            text-align: center;
        }
        .button{
            border: none;
            /* margin-inline: 3vw; */
            width: 9vh;
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

    }
</style>