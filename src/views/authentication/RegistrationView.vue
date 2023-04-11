<template>
  <h1 id="registrieren"> Jetzt REGISTRIEREN & Teil der Trello-Family werden. </h1>
  <br>
  <v-container class="grid-container-3">
    <div class="col-3">
      <img class="logo" src="../../assets/2023.png">
    </div>
    <div class="col-3">
      <v-form @submit.prevent="createNewUser">
        <v-text-field v-model="newUser.email" label="E-Mail" prepend-icon="mail_outline"></v-text-field>
        <v-text-field v-model="newUser.firstName" label="Vorname" prepend-icon="account_circle"></v-text-field>
        <v-text-field v-model="newUser.lastName" label="Nachname" prepend-icon="account_circle"></v-text-field>
        <v-text-field v-model="newUser.username" label="Username" prepend-icon="account_circle"></v-text-field>
        <v-text-field v-model="newUser.password" label="Passwort" prepend-icon="lock_open"
          :type="show1 ? 'text' : 'password'" name="input-10-1" hint="At least 8 characters" counter
          @click:append="show1 = !show1"></v-text-field>
        <v-switch v-model="newUser.termsOfUseAccepted" label="Terms of Use" color="success"></v-switch>
        <div id="neuerUser">
          <v-btn type="submit" color="info" prepend-icon="account_circle">
            Jetzt Registrieren.
          </v-btn>
        </div>
      </v-form>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from "@/stores/authenticationStore";
import { router } from '../../router';

const authStore = useAuthStore();

const newUser = ref({
  email: "",
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  termsOfUseAccepted: false
});

const fullName = computed(() => newUser.value.firstName + " " + newUser.value.lastName);
const errorMessage = ref("");

// async function createNewUser() {
//   await authStore.registerUser(newUser.value);
//   router.push("/dashboard");
// };

// async function createNewUser(){
//   if(!newUser.value){
//     errorMessage.value = "Bitte befüllen Sie alle Felder um sich registrieren zu können";
//   }
// };

async function createNewUser() {
  try {
    await authStore.registerUser(newUser.value);
    router.push("/user");
  }
  catch (error) {
    alert("Bitte befüllen Sie alle Felder korrekt, um sich zu registrieren");
  }
};




</script>

<style scoped>
.grid-container-3 {
    grid-template-columns: auto auto;
    gap: 10px;
    padding: 10px;
    padding-top: 10px;
    padding-left: 100px;
}

.grid-container-3>div {
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
  padding-top: 40px;

}

input {
  display: block;
}

#registrieren {
  text-align: center;
  color: black;
  font: 600 50px Montserrat;
  text-shadow: 0 10px 25px rgba(247, 246, 246, 0.3);
}

#neuerUser {
  align-items: center;
  text-align: center;
}
</style>

