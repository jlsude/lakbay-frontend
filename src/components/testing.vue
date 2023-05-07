<template>
    <div style = "display: flex; flex-direction: row;">
        <!-- ----------------------------- -->
        <div style = "display: flex; flex-direction: column; justify-content: flex-start; 
        background-color: #d9d9d9; 
        width: 90vh; height: 100vh;; margin-left: -0.5vw; margin-top: -0.5vw;
        gap: 1rem;" >
            <div class="logo-container1">
                <img class="logo1" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
            </div>
            <div>
                <h3 style = "text-align: center; font-size: 1.25vw;">Administrator Interface</h3>
                <h5 style = "text-align: center; font-size: 1vw; margin: auto;">Saul Goodman</h5>
            </div>
            <div style = "display: flex; flex-direction: column; justify-content: column; gap: calc(100%/7);
                align-items: center;">

                <button class = "InterfaceButtons" disabled>Register Location</button>
                <button class = "InterfaceButtons">Manage Locations</button>
                <button class = "InterfaceButtons">Lakbay Bucket List</button>
                <button class = "InterfaceButtons">Maps</button>
                <button class = "InterfaceButtons">Managers</button>
                <button class = "InterfaceButtons">Administrator</button>
                <button class = "InterfaceButtons">Users</button>

                <button class = "InterfaceButtonLogout">Logout</button>
                
            </div>
        </div>
        <!-- ----------------------------- -->
        <div style = "display: flex;">
            <div class="logo-container2">
                <img class="logo2" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{


        }
    },
    mounted(){

    },
    methods: {

    }
}
</script>

<style>
   @media screen and (min-width: 700px) and (min-height: 600px) {
    .logo-container1 {
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .logo1 {
        width: 50%;
        margin-top: 5vh;
    }
    .logo-container2 {

        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .logo2 {
        width: 50%;

        align-self: center;
    }

    .InterfaceButtons {
        border: none;
        width: 15vw;
        height: 6.5vh;
        border-radius: 1.4vh;
        margin-top: 2vh;
        background-color: #c4c4c4;
        padding: 2.5px;
        cursor: pointer;

        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: calc(0.5em + 4vw);
        line-height: 1;
        font-size: 1vw;
    }
    .InterfaceButtonLogout {
        border: none;
        width: 6vw;
        height: 5vh;
        border-radius: 1.4vh;
        margin-top: 5vh;
        background-color: #c4c4c4;
        padding: 2.5px;
        cursor: pointer;

        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 1vh;
        line-height: 1;
        font-size: 1vw;
    }
    .InterfaceButtons:active, .InterfaceButtonLogout:active{
        background-color: #3c3c3c;
    }
}
</style>

