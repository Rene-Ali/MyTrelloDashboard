<template>
  <h1 id="loginHeader"> Bitte einloggen für ein effizienteres, gemeinsames Arbeiten </h1>
  <br />
  <v-container class="grid-container-2">
    <div class="col-3">
      <img class="logo" src="../../assets/2023.png">
    </div>
    <!-- <div class="col-3"> -->
      <v-form @submit.prevent="loginUser">
        <v-text-field v-model="userToLogin.Username" label="Username" prepend-icon="account_circle"></v-text-field>
        <br>
        <v-text-field v-model="userToLogin.email" label="E-Mail" prepend-icon="mail_outline"></v-text-field>
        <br>
        <v-text-field v-model="userToLogin.password" label="Passwort" prepend-icon="lock_open"
          :type="show1 ? 'text' : 'password'" name="input-10-1" hint="At least 8 characters" counter
          @click:append="show1 = !show1"></v-text-field>
        <br>
        <div class="button">
          <v-btn type="submit" id="login" color="info" v-bind="props"> Login </v-btn>
          <v-btn @click.prevent="registrationPage" id="registration" variant="outlined" color="normal"> Registrieren
          </v-btn>
        </div>
      </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authenticationStore';
import { router } from "@/router";
import { useRoute } from "vue-router";


const authStore = useAuthStore();

const userToLogin = ref({
  email: "",
  password: ""
});


async function loginUser() {
  try {
    await authStore.loginUser(userToLogin.value);
    router.push("/user");
  }
  catch (error) {
    alert("Sie sind noch kein User. Bitte registrieren Sie sich jetzt");
    router.push("/register");
  }
};

async function registrationPage() {
  router.push("/register");
};

</script>

<style scoped>
.mx {
  width: 500px;
}

#loginHeader {
  text-align: center;
  font: 600 50px Montserrat;
  text-shadow: 0 10px 25px rgba(247, 246, 246, 0.3);
  color: black;
}

.button {
  text-align: center;
  align-items: center;
}

#login {
  align-items: center;
  text-align: center;
  margin-left: 10px;
}

#registration {
  align-items: center;
  text-align: center;
  margin-left: 10px;
}

.grid-container-2 {
    grid-template-columns: auto auto;
    gap: 10px;
    padding: 10px;
    padding-top: 10px;
    padding-left: 100px;
}

.grid-container-2>div {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
}


.logo{  
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  margin: auto;

}

</style>