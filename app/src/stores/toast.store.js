// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'

export const useToastStore = defineStore('toastStore', () => {
  const $toast = useToast()

  const createToast = ({ message, type = 'default' }) => {
    $toast.open({
      message,
      type
    })
  }

  return { createToast }
})
