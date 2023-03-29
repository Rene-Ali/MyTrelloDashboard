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
  <v-container class="mx auto" max-width="500">
    <v-form @submit.prevent="createNewTaskList">
      <v-row>
        <v-col>
          <v-text-field label="label" v-model="newTask.label"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="slug" v-model="newTask.slug"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="description" v-model="newTask.description"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn type="submit">Neue Taskliste erstellen</v-btn>
        </v-col>
      </v-row>
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

              <v-btn type="button" @click.prevent="removeTaskList(taskList.taskListId)" size="small" color="surface-variant" variant="text" icon="delete"></v-btn>
            </v-card-actions>
          </v-card>
       </v-col>
    </v-row>
  </v-container>
  <!--v-card
    class="mx-auto"
    max-width="500"
  >
    <v-container fluid>
      <v-row dense>
        <v-col>
          <v-card>
            <v-img
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
              <v-card-title class="text-white">Urlaub 2023</v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn size="small" color="surface-variant" variant="text" icon="thumb_up"></v-btn>

              <v-btn size="small" color="surface-variant" variant="text" icon="bookmark"></v-btn>

              <v-btn size="small" color="surface-variant" variant="text" icon="share_variant"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-container fluid>
      <v-row dense>
        <v-col>
          <v-card>
            <v-img
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
              <v-card-title class="text-white">Unternehmensorganigramm</v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn size="small" color="surface-variant" variant="text" icon="thumb_up"></v-btn>

              <v-btn size="small" color="surface-variant" variant="text" icon="bookmark"></v-btn>

              <v-btn size="small" color="surface-variant" variant="text" icon="share_variant"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-container fluid>
      <v-row dense>
        <v-col>
          <v-card>
            <v-img
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
              <v-card-title class="text-white"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn size="small" color="surface-variant" variant="text" icon="thumb_up"></v-btn>

              <v-btn size="small" color="surface-variant" variant="text" icon="bookmark"></v-btn>

              <v-btn size="small" color="surface-variant" variant="text" icon="share_variant"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card-->
</template>

<script setup>
import { computed, ref } from 'vue';
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();

const newTask = ref({
  label: "",
  slug: "",
  description: ""
});

const taskLists = computed(() => userStore.user.taskLists);

async function createNewTaskList() {
  await userStore.createNewTaskList(newTask.value);
}

async function removeTaskList(taskListId){
  console.log(taskListId);
  await userStore.removeTask(taskListId);
}

</script>

<style>
.align-end{
  background-image: url("@/assets/Dashboard.jpg");
  background-size: cover ;
  width: 100%;
  height: 40vh;
  opacity: 80%;
}

.Task{
  align-items: center;
}

</style>