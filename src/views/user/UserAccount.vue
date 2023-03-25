<template>
    <div style="float: left; width: 25%">
        <v-card>
    <v-layout>
      <v-navigation-drawer
        permanent
        location="left"
      >
        <template v-slot:prepend>
          <v-list-item
            lines="one"
            prepend-icon="account_circle"
            subtitle="Logged in"
          > </v-list-item>
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
    
    <div class ="user" style="float: right; width: 75%">
        <p>GeeksforGeeks</p>
        <p>Geeks Portal</p>
        <p>Writing Portal</p>
    </div>
</template>
<style>
#user{
    padding-top: 15px;
    margin-left: 30%;
}
</style>