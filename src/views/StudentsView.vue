<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useField, useForm } from 'vee-validate'
import { getAllStudents, createStudent, updateStudent, deleteStudent } from '@/api/studenst'
let id = 0
const editId = ref<number | undefined>(undefined)
const dialog = ref(false)
const editDialog = ref(false)
const valid = ref(false)
const students = ref<any[]>()
const error = ref()

const getStudents = async () => {
  students.value = await getAllStudents()
}
getStudents()

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value: string | any[]) {
      if (value?.length >= 2) return true

      return 'Name needs to be at least 2 characters'
    },
    group(value: string | any[]) {
      if (value?.length >= 2) return true

      return 'Group needs to be at least 4 characters'
    },
    birthday(value: string | undefined) {
      if (value === undefined) return 'Must be a valid birthday'
      if (value.match(/^\d{2}.\d{2}.\d{4}$/) && Date.parse(value) < Date.now()) return true

      return 'Must be a valid birthday'
    },
    gender(value: any) {
      if (value) return true

      return 'Select an item'
    },
    status(value: any) {
      if (value) return true

      return 'Select an item'
    }
  }
})
const name = useField('name')
const group = useField('group')
const birthday = useField('birthday')
const gender = useField('gender')
const status = useField('status')

const submit = handleSubmit(async (values: any) => {
  try {
    await createStudent(values)
    dialog.value = false
    getStudents()
  } catch (e: any) {
    error.value = e?.response?.data?.message
  }
})

const editSubmit = handleSubmit(async (values: any) => {
  await updateStudent(editId.value, values)
  editDialog.value = false
  getStudents()
})

const handleDelete = async (values: any) => {
  await deleteStudent(values)
  editDialog.value = false
  getStudents()
}
</script>

<template>
  <div class="about">
    <v-btn
      @click="() => ((dialog = true), handleReset())"
      style="align-self: flex-end; border: 1px solid black"
      variant="flat"
    >
      Add
    </v-btn>

    <v-dialog v-model="dialog" width="80%">
      <v-card>
        <v-card-text>
          <v-form @submit="submit" v-model="valid">
            <v-text-field
              v-model="group.value.value"
              :error-messages="group.errorMessage.value"
              label="Group"
              required
            ></v-text-field>

            <v-text-field
              v-model="name.value.value"
              :error-messages="name.errorMessage.value"
              label="Name"
              required
            ></v-text-field>

            <v-select
              v-model="gender.value.value"
              :items="['M', 'F']"
              :error-messages="gender.errorMessage.value"
              label="Gender"
              required
            ></v-select>

            <v-text-field
              v-model="birthday.value.value"
              :error-messages="birthday.errorMessage.value"
              label="Birthday"
              required
            ></v-text-field>

            <v-select
              v-model="status.value.value"
              :items="['Active', 'Inactive']"
              :error-messages="status.errorMessage.value"
              label="Status"
              required
            ></v-select>

            <div style="color: red; margin-bottom: 10px">{{ error }}</div>

            <v-btn class="me-4 mt-2" style="text-transform: none" type="submit"> Save </v-btn>

            <v-btn
              @click="() => ((dialog = false), handleReset())"
              style="text-transform: none"
              class="mt-2"
            >
              Cancel
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" width="80%">
      <v-card>
        <v-card-text>
          <v-form @submit="editSubmit" v-model="valid">
            <v-text-field
              v-model="group.value.value"
              :error-messages="group.errorMessage.value"
              label="Group"
              required
            ></v-text-field>

            <v-text-field
              v-model="name.value.value"
              :error-messages="name.errorMessage.value"
              label="Name"
              required
            ></v-text-field>

            <v-select
              v-model="gender.value.value"
              :items="['M', 'F']"
              :error-messages="gender.errorMessage.value"
              label="Gender"
              required
            ></v-select>

            <v-text-field
              v-model="birthday.value.value"
              :error-messages="birthday.errorMessage.value"
              label="Birthday"
              required
            ></v-text-field>

            <v-select
              v-model="status.value.value"
              :items="['Active', 'Inactive']"
              :error-messages="status.errorMessage.value"
              label="Status"
              required
            ></v-select>

            <v-btn class="me-4 mt-2" style="text-transform: none" type="submit"> Save </v-btn>

            <v-btn
              @click="() => ((editDialog = false), handleReset())"
              style="text-transform: none"
              class="mt-2"
            >
              Cancel
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-table style="flex: 1">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th style="text-align: center">Group</th>
          <th style="text-align: center">Name</th>
          <th style="text-align: center">Gender</th>
          <th style="text-align: center">Birthday</th>
          <th style="text-align: center">Status</th>
          <th style="text-align: center">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in students" :key="item.name">
          <td><input type="checkbox" /></td>
          <td style="text-align: center">{{ item.group }}</td>
          <td style="text-align: center">{{ item.name }}</td>
          <td style="text-align: center">{{ item.gender }}</td>
          <td style="text-align: center">{{ item.birthday }}</td>
          <td style="text-align: center">{{ item.status }}</td>
          <td class="button-group">
            <v-btn
              @click="
                () => (
                  (name.value.value = item.name),
                  (group.value.value = item.group),
                  (gender.value.value = item.gender),
                  (birthday.value.value = item.birthday),
                  (status.value.value = item.status),
                  (editId = item.id),
                  (editDialog = true)
                )
              "
              style="border: 1px solid black; text-transform: none"
              variant="flat"
              >Edit</v-btn
            >
            <v-btn
              @click="
                () => {
                  handleDelete(item.id)
                }
              "
              style="border: 1px solid black; text-transform: none"
              variant="flat"
              >Delete</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
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
