import Api from '@/services/Api'

export default {
  getAll () {
    return Api().get('/news/list')
  },
  add ({ title, content, category, author }) {
    return Api().put('/news/add', {
      title,
      content,
      category,
      author
    })
  },
  delete ({ id }) {
    return Api().delete('/news/delete', {
      data: {
        id
      }
    })
  },
  get ({ id }) {
    return Api().get('/news/get/' + id)
  },
  update ({ id, title, content, category, author }) {
    return Api().post('/news/update/' + id, {
      title,
      content,
      category,
      author
    })
  }

}