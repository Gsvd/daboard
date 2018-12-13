import AdminService from '@/services/AdminService'

export const apiToken = 'j"Vc8]/@!-(U8W#'

export async function login(username, password) {
  const response = await AdminService.login({ username: username, password: password })
  let success = response['data']['success']
  let answer = response['data']['answer']
  if (success) {
    localStorage.setItem('username', answer.username)
    localStorage.setItem('id', answer.id)
    localStorage.setItem('token', answer.token)
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
    return true
  } else {
    return false
  }
}

export function logout() {
  localStorage.removeItem('username')
  localStorage.removeItem('id')
  localStorage.removeItem('token')
}
