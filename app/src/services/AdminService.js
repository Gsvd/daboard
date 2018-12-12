import Api from '@/services/Api'
import { token } from '@/security.js'

const sha512 = require('js-sha512')

export default {
  signin ({ username, password }) {
    return Api().post('/admin/signin', {
      username,
      password: sha512(password)
    }, {
      headers: {
        authorization: `basic ${ token }`
      }
    })
  },
  getCategories () {
    return Api().get('/admin/category/list', {
      headers: {
        authorization: `basic ${ token }`
      }
    })
  }
}