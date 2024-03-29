<template>
  <v-row>
    <v-col cols="6" class="text-center justify-content-center d-none d-md-flex">
      <img src="@/assets/bulle.svg" alt="bulle" class="logo" />
    </v-col>
    <v-col cols="12" md="6">
      <h1 class="mt-16">Create Your Account</h1>
      <div class="mb-10">
        Already have an account ? <router-link to="/login">Login</router-link>
      </div>
      <div class="form-width">
        <v-form @submit.prevent="submit">
          <v-text-field
            class="mb-3"
            clearable
            v-model="user.firstname.value.value"
            :error-messages="errorBag.firstname"
            type="text"
            color="appgrey"
            variant="outlined"
            label="Prénom"
          />
          <v-text-field
            class="mb-3"
            clearable
            v-model="user.lastname.value.value"
            :error-messages="errorBag.lastname"
            type="text"
            color="appgrey"
            variant="outlined"
            label="Nom"
          />
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
            clearable
            hint="Must be over 18 years old"
            v-model="user.birthdate.value.value"
            :error-messages="errorBag.birthdate"
            type="date"
            color="appgrey"
            variant="outlined"
            label="Date de naissance"
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
          <v-text-field
            class="mb-3"
            v-model="user.confirmPassword.value.value"
            :error-messages="errorBag.confirmPassword"
            :type="show2 ? 'text' : 'password'"
            :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            color="appgrey"
            variant="outlined"
            @click:append-inner="show2 = !show2"
            label="Confirmation du mot de passe"
          />
          <div>
            <v-btn type="submit" class="w-100 mb-3" color="appgrey">Register</v-btn>
          </div>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import { useToastStore } from '@/stores'
import { useUsersStore } from '../../stores/users.store'
import { registerSchema } from '@/models'
import { useRouter } from 'vue-router'

const router = useRouter()
const stores = {
  toast: useToastStore()
}

const show1 = ref(false)
const show2 = ref(false)

const initValues = {
  firstname: '',
  lastname: '',
  email: '',
  birthdate: '',
  password: '',
  confirmPassword: ''
}

const { errorBag, handleSubmit, resetForm } = useForm({
  initialValues: initValues,
  validationSchema: registerSchema
})

const user = {
  firstname: useField('firstname'),
  lastname: useField('lastname'),
  email: useField('email'),
  birthdate: useField('birthdate'),
  password: useField('password'),
  confirmPassword: useField('confirmPassword')
}

const submit = handleSubmit(async (values) => {
  const res = await useUsersStore().register(values)
  if (res.success) {
    resetForm()
    stores.toast.createToast({
      type: 'success',
      message: res.message
    })
    router.push('/login')
  } else {
    return stores.toast.createToast({
      type: 'error',
      message: res.message
    })
  }
})
</script>

<style scoped>
.form-width {
  max-width: 500px;
}

.col-bg-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
}
</style>
