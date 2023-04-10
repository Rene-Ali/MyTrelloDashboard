<template>
  <header>
    <h1> Meine Einstellungen </h1>
  </header>
  <div class="profile">
    <v-card>
      <v-layout>
        <v-navigation-drawer permanent location="left">
          <template v-slot:prepend>
            <div style="padding-left: 100px">
             <AvatarComponent/>
             </div>
            <v-list-item lines="two" :title="user.username" subtitle="Logged in" style="padding-left: 90px;">
            </v-list-item>
          </template>
          <v-list density="compact" nav>
            <v-list-item prepend-icon="account_circle" title="Settings" value="settings"></v-list-item>
            <v-list-item @click="zumDashboard" prepend-icon="dashboard" title="Dashboard" value="dashboard"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main style="height: 200px"></v-main>
      </v-layout>
    </v-card>
  </div>

  <div class="user" style="float: right; width: 65%">
    <v-card max-width=auto class="mx-auto" color="grey-lighten-3">
      <v-layout>
        <v-app-bar color="teal-darken-4" image="@/assets/UserDashboard.jpg">
        </v-app-bar>
      </v-layout>
    </v-card>
    <!-- <div v-for="taskList in user.taskLists"> {{ taskList.label }}
    </div> -->
  </div>

  <v-card color="white" theme="dark" class="w-25 mx-auto ma-12 pa-10" elevation="10">
        <div class="d-flex flex-column align-center justify-center">
            <AvatarComponent size="75" />
            <div class="d-flex flex-column align-center">
                <v-card-title class="text-h5 text-center">
                    {{ user.username }}
                </v-card-title>
                <v-card-subtitle clas="mx-auto">
                    {{ user.firstName }} {{ user.lastName }}
                </v-card-subtitle>
                <v-btn v-if="userStore.userImage == null" class="mx-auto bg-accent mt-5" variant="text" rounded="xs"
                    @click="changeAvatar">
                    Upload Avatar
                </v-btn>
                <v-btn v-else class="mx-auto bg-secondary mt-5" variant="text" rounded="xs" @click="deleteAvatar">
                    DeleteAvatar
                </v-btn>
            </div>
            <v-file-input accept="image/png, image/jpeg, image/bmp" prepend-icon="camera" label="Upload Avatar"
                class="w-100 pt-3 " v-model="image">
            </v-file-input>
        </div>
    </v-card>
</template>
<script setup>
import { ref, computed } from 'vue';
//import {useUserStore} from '@/store/userStore.js';
import { useUserStore } from '../../stores/userStore.js';
import AvatarComponent from "../layout/AvatarComponent.vue";
import { router } from '../../router';

const userStore = useUserStore();

const user = computed(() => userStore.user);

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
        await axios.post("https://codersbay.a-scho-wurscht.at/api/user/image", formData, userStore.axiosHeader); // send the form data with the binary image file to the server
        isUpdateable.value = !isUpdateable.value; // Change the button function
    } catch (err) {
        console.log(err)
    }
}
async function deleteAvatar() {
    try {
        userStore.userImage = null; // Delete from store
        await axios.delete("https://codersbay.a-scho-wurscht.at/api/user/image", userStore.axiosHeader);
        isUpdateable.value = !isUpdateable.value; // Change button functionality 
    } catch (err) {
        console.log("no picture available to delete")
    }
}

async function zumDashboard(){
  await router.push('/dashboard');
}

</script>

<style scoped>
header{
  background-image: url("@/assets/einstellungen_people_komprimiert.jpg");
  background-size: cover;
  width: 100%;
  height: 40vh;
  opacity: 80%;
}


h1{
  color: white;
  text-align: center;
  justify-content: center;
  padding-top: 10%;
  font: 600 50px Montserrat;
}

#user {
  padding-top: 15px;
  margin-left: 30%;
}

.profile{
  display:flex;
  padding-left: 25px;
  padding-top: 25px;
}
</style>


