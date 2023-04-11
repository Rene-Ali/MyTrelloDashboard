
import SitebarLayout from './SitebarLayout.vue';

<template>
    <div class ="background-image">
    </div>
    <VMain>

        <RouterView/>
    </VMain>
</template>


<style scoped>
.background-image {
  background-image: url("@/assets/Loginbild.jpg");
  background-size: cover ;
  width: 100%;
  height: 40vh;
  opacity: 80%;
}


</style>