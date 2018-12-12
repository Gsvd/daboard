import Api from '@/services/Api'
import { token } from '@/security.js'

export default {
  getAll () {
    return Api().get('/news/list', {
        headers: {
            authorization: `basic ${ token }`
        }
    })
  },
  add ({ title, content, category, author }) {
    return Api().post('/news/add', {
      title,
      content,
      category,
      author
    }, {
      headers: {
        authorization: `basic ${ token }`
      }
    })
  }
}