import Api from '@/services/Api'
import { apiToken } from '@/utils/security.js'

export default {
  getAll () {
    return Api().get('/news/list', {
        headers: {
            authorization: `basic ${ apiToken }`
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
        authorization: `basic ${ apiToken }`
      }
    })
  },
  delete ({ id }) {
    return Api().delete('/news/delete', {
      headers: {
        authorization: `basic ${ apiToken }`
      },
      data: {
        id
      }
    })
  },
  get ({ id }) {
    return Api().get('/news/get/' + id, {
      headers: {
        authorization: `basic ${ apiToken }`
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
        authorization: `basic ${ apiToken }`
      }
    })
  }

}