import AdminService from '@/services/AdminService'
import store from '@/store.js'

export async function login(username, password) {
  const response = await AdminService.login({ username: username, password: password })
  let success = response['data']['success']
  let answer = response['data']['answer']
  if (success) {
    localStorage.setItem('username', answer.username)
    localStorage.setItem('id', answer.id)
    localStorage.setItem('token', answer.token)
    localStorage.setItem('rank', answer.rank)
    return true
  } else {
    return false
  }
}

export async function connectByToken(id, token) {
  const response = await AdminService.isLogged({ id, token })
  let success = response['data']['success']
  if (success) {
    let answer = response['data']['answer']
    localStorage.setItem('username', answer.username)
    localStorage.setItem('id', answer.id)
    localStorage.setItem('token', answer.token)
    localStorage.setItem('rank', answer.rank)
    return true
  } else {
    return false
  }
}

export function logout() {
  localStorage.removeItem('username')
  localStorage.removeItem('id')
  localStorage.removeItem('token')
  store.state.logged = false
}

export async function autoAuthentication() {
  if (!store.state.logged) {
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    if (id && token) {
      let connected = await connectByToken(id, token)
      if (connected) {
        store.state.logged = connected
        store.state.username = localStorage.getItem('username')
        store.state.rank = localStorage.getItem('rank')
      }
    }
  }
}