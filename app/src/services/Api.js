import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://10.10.16.100:3000`
  })
}