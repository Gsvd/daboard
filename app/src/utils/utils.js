import Toastify from 'toastify-js'
import { version } from '../../package.json'
import axios from 'axios'
import { appenum } from '@/utils/enum.js'

export function showToast(text, color) {
  Toastify({
      text: text,
      duration: 3000,
      backgroundColor: color
  }).showToast()
}

export function showStickyToast(text, color) {
  Toastify({
      text: text,
      sticky: true,
      backgroundColor: color
  }).showToast()
}

export function updateAvailable() {
  axios
    .get('https://raw.githubusercontent.com/Velkow/daboard/master/app/package.json')
    .then((response) => {
      let lastVersion = response.data.version
      if (lastVersion !== null && version !== lastVersion) {
        showStickyToast(appenum.UPDATE_AVAILABLE + ` - v${ lastVersion }`)
      }
    })
}

export function greeting() {
  let hour = new Date().getHours()
  if (hour < 12)
    return 'Good morning'
  else if (hour < 18)
    return 'Good afternoon'
  else
    return 'Good evening'
}