<template>
    <v-avatar v-if="userStore.userImage === null" color="info" :size="size"><v-icon icon="mdi-account-circle" :size="size" ></v-icon></v-avatar>
    <!--Use a default avatar if there is no image saved in the store-->
    <v-avatar v-else :size="size" color="">
        <v-img :src="userStore.userImage" alt="userImage" > </v-img>
    </v-avatar>
</template>

<script setup>
    import { useUserStore} from '@/stores/userStore';

    defineProps(["size"]);

    const userStore = useUserStore();
</script>
