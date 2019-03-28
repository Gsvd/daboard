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
  getUsers () {
    return Api().get('/admin/users')
  },
  deleteUser (id) {
    return Api().delete(`/admin/user/${ id }`)
  }
}