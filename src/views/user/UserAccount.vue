<template>
  <div style="float: left; width: 25%">
    <v-card>
      <v-layout>
        <v-navigation-drawer permanent location="left">
          <template v-slot:prepend>
            <v-list-item lines="two" prepend-icon="account_circle" :title="user.Username" subtitle="Logged in">
            </v-list-item>
          </template>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item prepend-icon="home" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="account_circle" title="Settings" value="settings"></v-list-item>
            <v-list-item prepend-icon="account_group" title="My Friends" value="friends"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main style="height: 300px"></v-main>
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
    <div v-for="taskList in user.taskLists"> {{ taskList.label }}
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
//import {useUserStore} from '@/store/userStore.js';
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();

const user = computed(() => userStore.user);
</script>

<style>
#user {
  padding-top: 15px;
  margin-left: 30%;
}
</style>