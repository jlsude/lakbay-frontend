<template>
    <div>
        
        <div class="logo-container">
        <img class="logo" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
        </div>
        
    </div>
</template>

<script>
export default {

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
    }
</style>