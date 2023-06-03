<template>
  <v-row>
    <v-col cols="6" class="text-center justify-content-center">
      <img src="@/assets/bulle.svg" alt="bulle" class="logo" />
    </v-col>
    <v-col cols="6">
      <h1 class="mt-16">Create Your Account</h1>
      <div class="mb-10">Already have an account ? <a href="/login">Login</a></div>
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
            <v-btn type="submit" class="w-100 mb-3" color="appgrey">Login</v-btn>
          </div>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import { object, string, ref as yupRef } from 'yup'
import { useUserStore } from '@/stores'

const schema = object({
  firstname: string()
    .required('Le champ prénom est requis.')
    .min(3, 'Le prénom doit contenir au moins 3 caractères.')
    .trim()
    .lowercase(),
  lastname: string()
    .required('Le champ nom est requis.')
    .min(3, 'Le nom doit contenir au moins 3 caractères.'),
  email: string().required('Le champ email est requis.').email().trim(),
  birthdate: string().required('Le champ date de naissance est requis.').trim(),
  password: string()
    .required('Le champ mot de passe est requis.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial'
    )
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
    .trim(),
  confirmPassword: string()
    .required('Le champ confiramtion de mot de passe est requis.')
    .oneOf([yupRef('password'), null], 'Les mots de passe doivent être identiques.')
    .trim()
})

const show1 = ref(false)
const show2 = ref(false)

const userStore = useUserStore()

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
  validationSchema: schema
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
  console.log(values)
  const res = await userStore.register(values)
  if (res.success) {
    console.log(res, 'ok')
    resetForm()
  } else {
    console.log(res, 'ko')
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

@media (max-width: 768px) {
  .logo {
    width: 100%;
  }
  .form-width {
    max-width: 200px;
  }
}
</style>
