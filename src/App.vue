<template>
  <header>

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/register">Register</RouterLink> |
        <RouterLink to="/login">Login</RouterLink> |
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  import router from "@/router";
  import { useAuthStore } from './stores/authenticationStore';

  const authStore = useAuthStore();

  onMounted(async () => {
    try {
      await authStore.checkIfLoggedIn();
    }
    catch(error) {
      router.push("/login");
    }
    
  });


</script> 

<style scoped>
  main, header {
    max-width: 1200px;
    margin: auto;
  }
</style>