<template>
  <div>
    <form>
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="useremail">
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="userpassword">
      <br>
      <button type="submit" @click.prevent="login">Login</button>
    </form>
    <div v-if="errorMessages.length">
      <p>Please fix the following errors:</p>
      <ul>
        <li v-for="errorMessage in errorMessages" :key="errorMessage">{{ errorMessage }}</li>
      </ul>
    </div>
    <p v-if="message">{{ message }}</p>
    <p v-if="token">{{ token }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../../store'


export default {
  data() {
    return {
      useremail: '',
      userpassword: '',
      errorMessages: [],
      message: '',
      token: '',
    }
  },
  methods: {
    login() {
      const data = {
        useremail: this.useremail,
        userpassword: this.userpassword
      }
      axios.post('http://localhost:7000/loginpage/u/login', data)
        .then(response => {
          if (response.data.success) {
            const token = response.data.token;
            // Store the token in local storage or Vuex store
            this.token = `Token: ${token}`;
            store.dispatch('setToken', token);
            this.message = 'Congrats you logged in';
            this.errorMessages = [];
            //this.$router.push('/');
          }
          else {
            this.message = '';
            this.token = '';
            this.errorMessages.push('Invalid email or password.');
          }
        })
        .catch(error => {
          console.error(error);
          this.message = '';
          this.token = '';
          this.errorMessages.push('An error occurred while logging in.');
        });
    }
  }
}
</script>
