import axios from 'axios'

export async function getAllStudents() {
  const response = await axios.get('http://127.0.0.1:8000/api/students')
  return response.data
}

export async function createStudent(values: any) {
  const response = await axios.post('http://127.0.0.1:8000/api/students', {
    ...values
  })
}

export async function updateStudent(id: number | undefined, values: any) {
  const response = await axios.put('http://127.0.0.1:8000/api/students/' + id, {
    ...values
  })
  return response.data
}

export async function deleteStudent(id: number | undefined) {
  const response = await axios.delete('http://127.0.0.1:8000/api/students/' + id)
  return response.data
}

// messengers api calls

export async function getAllChats(id: string) {
  const response = await axios.get('http://localhost:3000/chat/' + id)
  return response.data
}
