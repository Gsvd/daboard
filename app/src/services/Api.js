import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://10.10.18.5:3000`
  })
}