import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('user', {
  state: () => {
    return {
      user: null as User | null
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user
  },
  actions: {
    async registerUser(username: string, name: string, password: string) {
      try {
        const response = await axios.post('http://localhost:3000/auth/signup', {
          username,
          name,
          password
        })

        this.user = {
          id: response.data.id,
          username: response.data.username,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        }

        localStorage.setItem('refreshToken', JSON.stringify(this.user.refreshToken))
        localStorage.setItem('accessToken', JSON.stringify(this.user.accessToken))
        console.log('registerUser')

        router.push('/home/students')
      } catch (error) {
        console.log(error)
      }
    },
    async loginUser(username: string, password: string) {
      try {
        const response = await axios.post('http://localhost:3000/auth/signin', {
          username,
          password
        })

        this.user = {
          id: response.data.id,
          username: response.data.username,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        }

        localStorage.setItem('refreshToken', JSON.stringify(this.user.refreshToken))
        localStorage.setItem('accessToken', JSON.stringify(this.user.accessToken))

        router.push('/home/students')
      } catch (error) {
        console.log(error)
      }
    }
  }
})

interface User {
  id: string
  username: string
  accessToken?: string
  refreshToken?: string
}
