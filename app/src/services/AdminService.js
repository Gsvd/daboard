import Api from '@/services/Api'

const sha512 = require('js-sha512')

export default {
  login ({ username, password }) {
    return Api().post('/admin/login', {
      username,
      password: sha512(password)
    })
  },
  getCategories () {
    return Api().get('/admin/category/list')
  },
  isLogged ({ id, token }) {
    return Api().get(`/admin/logged/user/${ id }/token/${ token }`)
  },
  getRankById (id) {
    return Api().get(`/admin/rank/${ id }`)
  },
  getRanks () {
    return Api().get(`/admin/ranks`)
  },
  addUser (user) {
    user.hashed = sha512(user.password)
    return Api().put('/admin/user', {
      user
    })
  },
  getUsers () {
    return Api().get('/admin/users')
  },
  deleteUser (id) {
    return Api().delete(`/admin/user/${ id }`)
  },
  getConfiguration () {
    return Api().get('/admin/configuration')
  },
  setConfiguration (config) {
    return Api().post('/admin/configuration', {
      config
    })
  }
}