<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { reactive, ref } from 'vue'
</script>

<template>
  <v-layout>
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
        <RouterLink style="text-decoration: none" to="/"
          ><v-list-item>
            <v-btn style="text-transform: none" variant="flat">Dashboard</v-btn></v-list-item
          ></RouterLink
        >
        <RouterLink style="text-decoration: none" to="/"
          ><v-list-item>
            <v-btn style="text-transform: none" variant="flat">Students</v-btn></v-list-item
          ></RouterLink
        >
        <RouterLink style="text-decoration: none" to="/">
          <v-list-item>
            <v-btn style="text-transform: none" variant="flat">Tasks</v-btn></v-list-item
          ></RouterLink
        >
      </v-list>
    </v-navigation-drawer>

    <v-main style="min-height: 300px">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
