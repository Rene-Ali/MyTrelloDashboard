<template>
    <v-card color="white" theme="dark" class="w-25 mx-auto ma-12 pa-10" elevation="10">
        <div class="d-flex flex-column align-center justify-center">
            <AvatarComponent size="75" />
            <div class="d-flex flex-column align-center">
                <v-card-title class="text-h5 text-center">
                    {{ userStore.user.user?.username }}
                </v-card-title>
                <v-card-subtitle clas="mx-auto">
                    {{ userStore.user.user?.firstName }} {{ userStore.user.user?.lastName }}
                </v-card-subtitle>
                <v-btn v-if="userStore.userImage == null" class="mx-auto bg-accent mt-5" variant="text" rounded="xs"
                    @click="changeAvatar">
                    Upload Avatar
                </v-btn>
                <v-btn v-else class="mx-auto bg-secondary mt-5" variant="text" rounded="xs" @click="deleteAvatar">
                    DeleteAvatar
                </v-btn>
            </div>
            <v-file-input accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera" label="Upload Avatar"
                class="w-100 pt-3 " v-model="image">
            </v-file-input>
        </div>
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore.js";
import axios from "axios";
import AvatarComponent from "../layout/AvatarComponent.vue";

const userStore = useUserStore();

const image = ref(null);
const imageSrc = ref(null);
const isUpdateable = ref(true);


async function changeAvatar() {
    // Revoke URL to make sure that there are no memory leaks
    if (imageSrc.value != null) {
        URL.revokeObjectURL(imageSrc.value);
    }
    // Make a form data so the binary data can be submitted
    const formData = new FormData();
    formData.append("image", image.value[0]);
    try {
        imageSrc.value = URL.createObjectURL(image.value[0]); // make an URL so it cant be used as the source for the avatar
        userStore.userImage = imageSrc.value;
        await axios.post("https://codersbay.a-scho-wurscht.at/api/user/image", formData, userStore.getAxiosConfig()); // send the form data with the binary image file to the server
        isUpdateable.value = !isUpdateable.value; // Change the button function
    } catch (err) {
        console.log(err)
    }
}
async function deleteAvatar() {
    try {
        userStore.userImage = null; // Delete from store
        await axios.delete("https://codersbay.a-scho-wurscht.at/api/user/image", userStore.getAxiosConfig());
        isUpdateable.value = !isUpdateable.value; // Change button functionality 
    } catch (err) {
        console.log("no picture available to delete")
    }
}
</script>

