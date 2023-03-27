<template>
   <h1> Jetzt REGISTRIEREN & Teil der Trello-Family werden. </h1>
   <br>
   <v-form @submit.prevent="createNewUser">
    <v-text-field v-model="newUser.email" label="E-Mail" prepend-icon="mail_outline"></v-text-field>
    <v-text-field v-model="newUser.firstName" label="Vorname" prepend-icon="account_circle"></v-text-field>
    <v-text-field v-model="newUser.lastName" label="Nachname" prepend-icon="account_circle"></v-text-field>
    <v-text-field v-model="newUser.username" label="Username" prepend-icon="account_circle"></v-text-field>
    <v-text-field v-model="newUser.password" label="Passwort" prepend-icon="lock_open" 
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"></v-text-field> 
      <v-switch v-model="newUser.termsOfUseAccepted" label="Terms of Use" color="success"></v-switch>
    <div id="neuerUser">
      <v-btn type="submit" color="info" prepend-icon="account_circle">
        Jetzt Registrieren.
      </v-btn>
    </div>
    
    </v-form>
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

    async function createNewUser() {
      console.log("user")
        await authStore.registerUser(newUser.value);
        router.push("/dashboard");
    };



</script>

<style scoped>
    input {
        display: block;
    }

    h1{
      text-align: center;
    }

    #neuerUser{
      align-items: center;
      text-align: center;
    }
</style>

