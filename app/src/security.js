import Toastify from 'toastify-js'

export const token = 'j"Vc8]/@!-(U8W#'

export function showToast(text, color) {
    Toastify({
        text: text,
        duration: 3000,
        backgroundColor: color
    }).showToast()
}