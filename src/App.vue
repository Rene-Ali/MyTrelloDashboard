<template>
  <V-App>
    <RouterView/>
  </V-App>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
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

</style>