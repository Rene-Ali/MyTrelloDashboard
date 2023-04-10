<template>
  <header>
    <div class="main-content">
      <div class="concept concept-one">
        <div class="hover hover-1"></div>
        <div class="hover hover-2"></div>
        <div class="hover hover-3"></div>
        <div class="hover hover-4"></div>
        <div class="hover hover-5"></div>
        <div class="hover hover-6"></div>
        <div class="hover hover-7"></div>
        <div class="hover hover-8"></div>
        <div class="hover hover-9"></div>
        <h1>Willkommen zu Ihrem persönlichen Dashboard</h1>
      </div>
    </div>
  </header>
  <br>
  <div class="avatar">
    <AvatarComponent size="75"/>
    Username: {{ user.username }}
  </div>
  <v-container class="mi">
    <v-form @submit.prevent="createNewTaskList">
      <v-row>
        <v-col>
          <v-text-field label="label" v-model="newTaskList.label"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="slug" v-model="newTaskList.slug"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="description" v-model="newTaskList.description"></v-text-field>
        </v-col>
      </v-row>
      <div class="dashboardBtn">
        <v-col>
          <v-btn type="submit">Neue Taskliste erstellen</v-btn>
          <v-btn @click="zuNotizen">Zu meinen persönlichen Notizen</v-btn>
        </v-col>
      </div>
    </v-form>
    <br>
    <v-row dense>
      <v-col>
        <v-card v-for="taskList in taskLists" class="mx-auto" max-width="500" display: block>
          <router-link :to="'/' + taskList.taskListId">
            <v-img class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" cover>
              <v-card-title class="text-white">{{ taskList.label }}</v-card-title>
            </v-img>
          </router-link>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn size="small" color="surface-variant" variant="text" icon="thumb_up"></v-btn>

            <v-btn size="small" color="surface-variant" variant="text" icon="bookmark"></v-btn>

            <v-btn size="small" color="surface-variant" variant="text" icon="share"></v-btn>

            <v-btn type="button" @click.prevent="removeTaskList(taskList.taskListId)" size="small" color="surface-variant"
              variant="text" icon="delete"></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useUserStore } from '../../stores/userStore.js';
import { router } from "@/router";
import AvatarComponent from "../layout/AvatarComponent.vue";

//const router = useRouter();

const userStore = useUserStore();

const user = computed(() => userStore.user);

const newTaskList = ref({
  label: "",
  slug: "",
  description: ""
});

const taskLists = computed(() => userStore.user.taskLists);

async function createNewTaskList() {
  await userStore.createNewTaskList(newTaskList.value);
}

async function removeTaskList(taskListId) {
  console.log(taskListId);
  await userStore.removeTaskList(taskListId);
}

async function zuNotizen() {
  await router.push("/notes");
}

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

<style>
.align-end {
  background-image: url("@/assets/Dashboard.jpg");
  background-size: cover;
  width: 100%;
  height: 40vh;
  opacity: 80%;
}

.Task {
  align-items: center;
}

.mi{
  width: 500px;
  padding-top: 10px;
  align-items: center;
  justify-content: center;
}

.dashboardBtn{
  width: 500px;
  display: flex;
  align-items: center;
  flex-direction: row;
  text-align: center;
}

</style>