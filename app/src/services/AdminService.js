import Api from '@/services/Api'
import { apiToken } from '@/utils/security.js'

const sha512 = require('js-sha512')

export default {
  login ({ username, password }) {
    return Api().post('/admin/login', {
      username,
      password: sha512(password)
    }, {
      headers: {
        authorization: `basic ${ apiToken }`
      }
    })
  },
  getCategories () {
    return Api().get('/admin/category/list', {
      headers: {
        authorization: `basic ${ apiToken }`
      }
    })
  },
  isLogged ({ id, token }) {
    return Api().get(`/admin/logged/user/${ id }/token/${ token }`, {
      headers: {
        authorization: `basic ${ apiToken }`
      }
    })
  }
}