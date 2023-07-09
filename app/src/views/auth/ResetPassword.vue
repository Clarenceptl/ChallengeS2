<template>
  <v-row>
    <v-col cols="6" class="text-center justify-content-center">
      <img src="@/assets/bulle.svg" alt="bulle" class="logo" />
    </v-col>
    <v-col cols="6">
      <h1 class="mt-16 mb-10">Reset your password</h1>
      <div class="form-width">
        <v-form @submit.prevent="submit">
          <v-text-field
            class="mb-3"
            v-model="user.password.value.value"
            :error-messages="errorBag.password"
            :type="show1 ? 'text' : 'password'"
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show1 = !show1"
            color="appgrey"
            variant="outlined"
            label="Password"
          />
          <v-text-field
            class="mb-3"
            v-model="user.confirmPassword.value.value"
            :error-messages="errorBag.confirmPassword"
            :type="show2 ? 'text' : 'password'"
            color="appgrey"
            variant="outlined"
            :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show2 = !show2"
            label="Confirm Password"
          />
          <div>
            <v-btn type="submit" class="w-100 mb-3" color="appgrey">Update</v-btn>
          </div>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useToastStore } from '@/stores'
import { useForm, useField } from 'vee-validate'
import { resetPasswordSchema } from '@/models'
import { useRouter } from 'vue-router'
import { AuthService } from '../../services'

const router = useRouter()
const stores = {
  toast: useToastStore()
}

const show1 = ref(false)
const show2 = ref(false)

const { errorBag, handleSubmit, resetForm } = useForm({
  initialValues: {
    password: '',
    confirmPassword: ''
  },
  validationSchema: resetPasswordSchema
})

const user = {
  password: useField('password'),
  confirmPassword: useField('confirmPassword')
}

const submit = handleSubmit(async () => {
  const res = await AuthService.resetPassword({
    password: user.password.value.value,
    confirmPassword: user.confirmPassword.value.value,
    token: router.currentRoute.value.params.token
  })
  console.log(res)
  if (res?.success) {
    resetForm()
    stores.toast.createToast({
      message: res.data.message,
      type: 'success'
    })
    return router.push({ name: 'Home' })
  }
  stores.toast.createToast({
    message: res.message,
    type: 'error'
  })
})
</script>

<style scoped>
.form-width {
  max-width: 500px;
}

@media (max-width: 768px) {
  .logo {
    width: 100%;
  }
  .form-width {
    max-width: 200px;
  }
}
</style>
