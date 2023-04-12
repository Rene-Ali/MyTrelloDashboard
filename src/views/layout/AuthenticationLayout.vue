
import FooterView from '../authentication/FooterView.vue';

<template>
    <div class ="background-image">
    </div>
    <VMain>
        <RouterView/>
    </VMain>
  <div>
      <FooterView/>
    </div>
</template>

<script setup>
import FooterView from '../authentication/FooterView.vue';
</script>


<style scoped>
.background-image {
  background-image: url("@/assets/Loginbild.jpg");
  background-size: cover ;
  width: 100%;
  height: 40vh;
  opacity: 80%;
}


</style>