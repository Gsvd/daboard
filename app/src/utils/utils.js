import Toastify from 'toastify-js'

export function showToast(text, color) {
  Toastify({
      text: text,
      duration: 3000,
      backgroundColor: color
  }).showToast()
}