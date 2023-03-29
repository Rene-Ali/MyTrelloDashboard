<template>
  <h1 id="loginHeader"> Bitte einloggen für ein effizienteres, gemeinsames Arbeiten </h1>
  <br/>
  <v-container class="mx">
    <v-form @submit.prevent="loginUser">
      <v-text-field v-model="userToLogin.Username" label="Username" prepend-icon="account_circle"></v-text-field>
      <br>
      <v-text-field v-model="userToLogin.email" label="E-Mail" prepend-icon="mail_outline"></v-text-field>
      <br>
      <v-text-field v-model="userToLogin.password" label="Passwort" prepend-icon="lock_open" 
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"></v-text-field>
      <br>
      <div class="button">
        <v-btn type="submit" id="login" color="info"> Login </v-btn>
        <v-btn id="registration" variant="outlined" color="normal"> Registrieren </v-btn>
      </div>
  </v-form>
</v-container>
 <footer><i class="icon-social-twitter icons"></i>
          <i class="icon-social-github icons"></i>
          <i class="icon-social-dribbble icons"></i>
  </footer>

</template>

<script setup>
  import {ref} from 'vue'
  import { useAuthStore } from '@/stores/authenticationStore';
  import {router} from "@/router";

  const authStore = useAuthStore();

  const userToLogin = ref ({
    email: "",
    password: ""
  });

  async function loginUser() {
    try{
      await authStore.loginUser(userToLogin.value);
      router.push("/dashboard");
    }
    catch(error){
      alert("Sie sind noch kein User. Bitte registrieren Sie sich jetzt");
      router.push("/register");
    }
  };

</script>

<style scoped>

#loginHeader{
  text-align: center;
  font: 600 50px Montserrat;
  text-shadow: 0 10px 25px rgba(247, 246, 246, 0.3);
  color: black;
}

.button{
  text-align: center;
}

#login{
  align-items: center;
  text-align: center;
  margin-left: 10px;
}

#registration{
  align-items: center;
  text-align: center;
  margin-left: 10px;
}

</style>