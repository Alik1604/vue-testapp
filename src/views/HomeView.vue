<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useForm } from 'vee-validate'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app-bar
    style="padding-right: 20px; box-shadow: none; border-bottom: 1px solid black"
    title="CMS"
  >
    <v-hover>
      <v-btn style="padding: 10px">
        <v-badge dot color="red">
          <v-icon icon="mdi-bell"></v-icon>
        </v-badge>
      </v-btn>
    </v-hover>
    <v-overlay contained scrim="#036358" class="align-center justify-center">
      <v-btn variant="flat">See more info</v-btn>
    </v-overlay>
    <v-btn>
      <v-icon icon="mdi-account"></v-icon>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer permanent style="height: 100%; background-color: white">
    <v-list>
      <RouterLink style="text-decoration: none" to="/home/students"
        ><v-list-item>
          <v-btn style="text-transform: none" variant="flat">Dashboard</v-btn></v-list-item
        ></RouterLink
      >
      <RouterLink style="text-decoration: none" to="/home/students"
        ><v-list-item>
          <v-btn style="text-transform: none" variant="flat">Students</v-btn></v-list-item
        ></RouterLink
      >
      <RouterLink style="text-decoration: none" to="/home/students">
        <v-list-item>
          <v-btn style="text-transform: none" variant="flat">Tasks</v-btn></v-list-item
        ></RouterLink
      >
      <RouterLink style="text-decoration: none" to="/home/chat">
        <v-list-item>
          <v-btn style="text-transform: none" variant="flat">Chat</v-btn></v-list-item
        ></RouterLink
      >
    </v-list>
  </v-navigation-drawer>

  <v-main style="min-height: 300px"> <RouterView name="helper" /> </v-main>
</template>

<style>
.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 50px;
}

.button-group {
  display: flex;
  padding: 5px;
  gap: 5px;
  align-items: center;
  justify-content: center;
}
</style>
