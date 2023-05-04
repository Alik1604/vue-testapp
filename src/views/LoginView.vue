<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()
const userName = ref('')
const password = ref('')
const name = ref('')
const isNew = ref(false)

function SetIsNew() {
  isNew.value = !isNew.value
}

const submit = async () => {
  if (isNew.value) {
    await store.registerUser(userName.value, name.value, password.value)
  } else {
    await store.loginUser(userName.value, password.value)
  }
}
</script>

<template>
  <v-sheet
    width="300"
    class="mx-auto"
    style="display: flex; flex-direction: column; justify-content: center; height: 100vh"
  >
    <v-form v-if="isNew" validate-on="submit" @submit="submit">
      <v-text-field v-model="userName" label="User name"></v-text-field>
      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-text-field v-model="password" label="Password"></v-text-field>
      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
    <v-form v-if="!isNew" validate-on="submit" @submit.prevent="submit">
      <v-text-field v-model="userName" label="User name"></v-text-field>
      <v-text-field v-model="password" label="Password"></v-text-field>
      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
    <p
      v-if="!isNew"
      style="align-self: center; margin-top: 15px; cursor: pointer; color: blue"
      @click="SetIsNew"
    >
      First time? Register!
    </p>
    <p
      v-if="isNew"
      style="align-self: center; margin-top: 15px; cursor: pointer; color: blue"
      @click="SetIsNew"
    >
      Not your first time? Login!
    </p>
  </v-sheet>
</template>

<style></style>
