import axios from 'axios'

export default axios.create({
  baseURL: 'https://daisuki.nekouji.ru/api',
  headers: {
    'Content-type': 'application/json',
  },
})
