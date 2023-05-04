<script setup lang="ts">
import { getAllChats } from '@/api/studenst'
import { useAuthStore } from '@/stores/auth'
import { io } from 'socket.io-client'
import { onBeforeMount } from 'vue'
import { ref } from 'vue'

const auth = useAuthStore()
const message = ref('')
const search = ref('')
const selectedChat = ref('')
const chats = ref<any[]>([])

const socket = io('http://localhost:3000', {
  query: {
    userId: auth.user?.id
  }
})

socket.on('connect', () => {
  console.log('connected')
})

socket.on('disconnect', () => {
  console.log('disconnected')
})

socket.on('message', (data: any) => {
  messages.value.push(data)
})

socket.on('chatCreated', (data: any) => {
  chats.value.push(data)
  console.log(data)
})

const getChats = async () => {
  chats.value = await getAllChats(auth.user?.id as string)
  getChatName()
}
getChats()

function getChatName() {
  const chat = chats.value.map((item) => item.users)
  console.log(chat)
}

const messages = ref<any[]>([])

function sentMessage() {
  socket.emit('createMessage', {
    chat: selectedChat.value,
    content: message.value,
    sender: auth.user?.id,
    timestamp: Date.now()
  })
  message.value = ''
}

function getMessages(item: any) {
  selectedChat.value = item._id
  socket.emit(
    'findAllMessages',
    {
      chatId: item._id
    },
    (data: any) => {
      messages.value = data
    }
  )
}

function createChat() {
  socket.emit(
    'createChat',
    {
      userId: auth.user?.id,
      username: search.value
    },
    (data: any) => {
      console.log(data)
    }
  )
}
</script>

<template>
  <div style="display: flex; flex-direction: row">
    <v-list density="compact" style="min-width: 200px">
      <v-text-field
        style="margin-left: 20px"
        rounded="full"
        v-model="search"
        label="search"
        :append-inner-icon="'mdi-send'"
        variant="outlined"
        type="text"
        @click:append-inner="createChat"
      ></v-text-field>
      <v-list-subheader>Students</v-list-subheader>

      <v-list-item
        v-for="(item, i) in chats"
        :key="i"
        :value="item"
        active-color="primary"
        v-on:click="getMessages(item)"
      >
        <template v-slot:prepend>
          <v-avatar color="surface-variant"></v-avatar>
        </template>

        <v-list-item-title>{{
          item.users[0]._id !== auth.user?.id ? item.users[0].username : item.users[1].username
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-container v-if="selectedChat !== ''">
      <v-container
        style="
          display: flex;
          flex-direction: column;
          border: 1px solid black;
          max-height: 550px;
          overflow-y: scroll;
        "
      >
        <v-container style="display: grid" v-for="item in messages">
          <div style="justify-self: flex-end" v-if="item.sender._id === auth.user?.id">
            {{ item.content }}
          </div>
          <div style="border: none" v-else>{{ item.content }}</div>
        </v-container>
      </v-container>

      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              rounded="full"
              v-model="message"
              :append-inner-icon="'mdi-send'"
              variant="outlined"
              type="text"
              @click:append-inner="sentMessage"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<style></style>
