import Api from '@/services/Api'
import { token } from '@/security.js'

export default {
  getPosts () {
    return Api().get('/news/list', {
        headers: {
            Authorization: `basic ${ token }`
        },
    })
  }
}