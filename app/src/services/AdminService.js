import Api from '@/services/Api'
import { token } from '@/security.js'

const sha512 = require('js-sha512')

export default {
  signin ({ username, password }) {
    return Api().post('/admin/signin', {
      headers: {
        "Authorization": `basic ${ token }`
      },
      username,
      password: sha512(password)
    })
  }
}