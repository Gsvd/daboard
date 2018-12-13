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
    return Api().put('/news/add', {
      title,
      content,
      category,
      author
    }, {
      headers: {
        authorization: `basic ${ token }`
      }
    })
  },
  delete ({ id }) {
    return Api().delete('/news/delete', {
      headers: {
        authorization: `basic ${ token }`
      },
      data: {
        id
      }
    })
  },
  get ({ id }) {
    return Api().get('/news/get/' + id, {
      headers: {
        authorization: `basic ${ token }`
      }
    })
  },
  update ({ id, title, content, category, author }) {
    return Api().post('/news/update/' + id, {
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