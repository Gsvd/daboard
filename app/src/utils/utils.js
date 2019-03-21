import Toastify from 'toastify-js'

export function showToast(text, color) {
  Toastify({
      text: text,
      duration: 3000,
      backgroundColor: color
  }).showToast()
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