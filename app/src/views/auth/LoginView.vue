<template>
  <v-row>
    <v-col cols="6" class="text-center justify-content-center d-none d-md-flex">
      <img src="@/assets/bulle.svg" alt="bulle" class="logo" />
    </v-col>
    <v-col cols="12" md="6">
      <h1 class="mt-16">Login</h1>
      <div class="mb-10">
        Don't have an account ? <router-link to="/register">Create new account</router-link>
      </div>
      <div class="form-width">
        <v-form @submit.prevent="submit">
          <v-text-field
            class="mb-3"
            clearable
            v-model="user.email.value.value"
            :error-messages="errorBag.email"
            type="email"
            color="appgrey"
            variant="outlined"
            label="Email"
          />
          <v-text-field
            class="mb-3"
            v-model="user.password.value.value"
            :error-messages="errorBag.password"
            :type="show1 ? 'text' : 'password'"
            color="appgrey"
            variant="outlined"
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show1 = !show1"
            label="Mot de passe"
          />
          <div>
            <v-btn type="submit" class="w-100 mb-3" color="appgrey">Login</v-btn>
          </div>
          <v-btn variant="text" @click="forgotPassword = true">Forgot Password ?</v-btn>
        </v-form>
      </div>
    </v-col>
    <v-dialog v-model="forgotPassword" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Forgot Password</h2>
        </v-card-title>
        <v-card-subtitle>
          Enter your email address and we will send you a link to reset your password.
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-text-field
              class="mb-3"
              clearable
              v-model="user.email.value.value"
              :error-messages="errorBag.email"
              type="email"
              color="appgrey"
              variant="outlined"
              label="Email"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="forgotPassword = false">Cancel</v-btn>
          <v-btn color="blue-800" text @click="sendEmail">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useToastStore } from '@/stores'
import { useForm, useField } from 'vee-validate'
import { loginSchema } from '@/models'
import { useRouter } from 'vue-router'
import { useUsersStore } from '../../stores/users.store'
import { AuthService } from '@/services'

const router = useRouter()
const stores = {
  toast: useToastStore()
}

const show1 = ref(false)
const forgotPassword = ref(false)

const { errorBag, handleSubmit, resetForm } = useForm({
  initialValues: {
    email: '',
    password: ''
  },
  validationSchema: loginSchema
})

const user = {
  email: useField('email'),
  password: useField('password')
}

const sendEmail = async () => {
  const res = await AuthService.sendEmailResetPassword(user.email.value.value)
  if (res.success) {
    stores.toast.createToast({
      message: res.data.message,
      type: 'success'
    })
    forgotPassword.value = false
  } else {
    stores.toast.createToast({
      message: res.message,
      type: 'error'
    })
  }
}

const submit = handleSubmit(async (values) => {
  const res = await useUsersStore().login(values)
  if (res.success) {
    resetForm()
    router.push({ name: 'Home' })
  } else {
    return stores.toast.createToast({
      message: res.message,
      type: 'error'
    })
  }
})
</script>

<style scoped>
.form-width {
  max-width: 500px;
}

.col-bg-image {
  background-image: url('../assets/bulle.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
}

@media (max-width: 425px) {
  .col-bg-image {
    background-image: none;
  }
}
</style>
