import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `https://board.sis.supnice.fr/api`
  })
}