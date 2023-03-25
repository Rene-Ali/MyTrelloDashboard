<script setup>
import LoginView from './views/authentication/LoginView.vue'
import RegistrationView from './views/authentication/RegistrationView.vue'
import DashboardView from './views/user/DashboardView.vue';
import UserAccount from './views/user/UserAccount.vue';

</script>


<template>
  
  <v-app>
  <v-container>
    <RouterView/>
  </v-container>
  </v-app>

</template>


<style>

</style>
